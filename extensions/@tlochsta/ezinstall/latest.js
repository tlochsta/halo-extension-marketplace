// ezinstall v1.2.0 (081226)
//
// making a game pack:
// {
//   "name": "My Pack",
//   "description": "A description of the pack",
//   "author": "Your Name",
//   "version": "1.0",
//   "games": [
//     {
//       "id": "unique-game-id",
//       "name": "Game Name",
//       "url": "https://game.url/",
//       "icon": "gamepad-2",
//       "description": "Short description"
//     }
//   ]
// }
//   open the launcher pointing to a pack:
//   app.html?e_ezinstall_pack=https://yourhost.com/pack.json

LauncherExtension({
    id: 'ezinstall',
    name: 'EZinstall',
    version: '1.2.0',
    description: 'Install game packs from a URL or shareable link.',

    // install() runs once on first install — use for one-time defaults
    install(api) {
        api.storage.set('savedPacks', []);
    },

    // load() runs every time the launcher starts — re-register menus & queries
    load(api) {
        // Add "Game Packs" entry to the More menu
        api.menus.addToMore({
            icon: 'package',
            label: 'Game Packs',
            action: () => EZinstall.openPackBrowser(api)
        });

        // Register query handler: ?e_ezinstall_pack=<url>
        // When this param is present, auto-open the launcher and show the pack
        api.query.register('pack', (packUrl) => {
            api.toast.simple('EZinstall: loading pack...');
            // Open the launcher overlay, then slide into the pack after it opens
            api.launcher.openMenu();
            setTimeout(() => EZinstall.fetchAndShowPack(api, packUrl), 700);
        });
    }
});

// EZinstall internal helpers (module pattern, no global pollution)
const EZinstall = (() => {
    function openPackBrowser(api) {
        const savedPacks = api.storage.get('savedPacks') || [];

        const items = [
            ...savedPacks.map((pack, i) => ({
                icon: 'package',
                label: pack.name,
                rightIcon: 'chevron-right',
                action: () => fetchAndShowPack(api, pack.url)
            })),

            {
                icon: 'link',
                label: 'Import Pack from URL',
                rightIcon: 'arrow-right',
                action: ({ close }) => {
                    const url = prompt('Paste a game pack JSON URL or Data URI:');
                    if (url && url.trim()) {
                        close();
                        fetchAndShowPack(api, url.trim());
                    }
                }
            },

            {
                icon: 'upload',
                label: 'Export Game Pack',
                rightIcon: 'arrow-right',
                action: () => {
                    openExportMenu(api);
                }
            },

            ...(savedPacks.length > 0 ? [{
                icon: 'trash-2',
                label: 'Clear Saved Packs',
                rightIcon: 'x',
                action: ({ close }) => {
                    api.storage.set('savedPacks', []);
                    api.toast.simple('Saved packs cleared');
                    close();
                }
            }] : [])
        ];

        api.menus.open({
            type: 'list',
            subtitle: 'EZinstall',
            title: 'Game Packs',
            items: items.length > 0 ? items : [{
                icon: 'inbox',
                label: 'No packs saved yet — import one above'
            }]
        });
    }

    function fetchAndShowPack(api, url) {
        api.toast.simple('Fetching pack...');
        fetch(url)
            .then(r => {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(pack => {
                if (!pack.name || !Array.isArray(pack.games)) {
                    throw new Error('Invalid pack format');
                }

                const savedPacks = api.storage.get('savedPacks') || [];
                if (!savedPacks.find(p => p.url === url)) {
                    savedPacks.unshift({ name: pack.name, url, addedAt: Date.now() });
                    // keep max 10 saved packs
                    if (savedPacks.length > 10) savedPacks.pop();
                    api.storage.set('savedPacks', savedPacks);
                }

                showPackMenu(api, pack, url);
            })
            .catch(err => {
                api.toast.simple('EZinstall error: ' + err.message);
            });
    }

    function showPackMenu(api, pack, url) {
        const existing = api.games.getAll();

        function isInstalled(game) {
            return !!existing.find(g => g.url === game.url || g.id === ('ezinstall_' + game.id));
        }

        const installedCount = pack.games.filter(isInstalled).length;
        const newCount = pack.games.length - installedCount;

        const items = [
            {
                icon: 'info',
                label: (pack.description || pack.name) + (pack.author ? ' · by ' + pack.author : ''),
            },

            {
                icon: 'download',
                label: newCount > 0
                    ? `Install All  (${newCount} new, ${installedCount} already installed)`
                    : `All ${pack.games.length} games already installed`,
                rightIcon: newCount > 0 ? 'download' : 'check-circle',
                action: ({ close }) => {
                    if (newCount === 0) {
                        api.toast.simple('All games already installed');
                        return;
                    }
                    let added = 0;
                    pack.games.forEach(game => {
                        if (!isInstalled(game)) {
                            api.games.add({
                                id: game.id,
                                name: game.name,
                                url: game.url,
                                icon: game.icon || 'gamepad-2'
                            });
                            added++;
                        }
                    });
                    api.toast.notify(
                        'Pack Installed',
                        `${added} game${added !== 1 ? 's' : ''} added from "${pack.name}"`,
                        'package'
                    );
                    close();
                }
            },

            {
                icon: 'share-2',
                label: 'Copy Shareable Link',
                rightIcon: 'copy',
                action: ({ close }) => {
                    // build the link using the query API (via the registered query key)
                    const link = window.location.href.split('?')[0] + '?e_ezinstall_pack=' + encodeURIComponent(url);
                    navigator.clipboard.writeText(link)
                        .then(() => api.toast.simple('Link copied to clipboard'))
                        .catch(() => api.toast.simple('Link: ' + link));
                }
            },

            {
                icon: 'list',
                label: `── ${pack.games.length} games in this pack ──`
            },

            ...pack.games.map(game => {
                const installed = isInstalled(game);
                return {
                    icon: game.icon || 'gamepad-2',
                    label: game.name + (game.description ? '  —  ' + game.description : ''),
                    rightIcon: installed ? 'check-circle' : 'plus',
                    action: ({ close }) => {
                        if (installed) {
                            api.toast.simple(`"${game.name}" is already in your library`);
                        } else {
                            api.games.add({
                                id: game.id,
                                name: game.name,
                                url: game.url,
                                icon: game.icon || 'gamepad-2'
                            });
                            api.toast.simple(`"${game.name}" added!`);
                            close();
                            setTimeout(() => showPackMenu(api, pack, url), 500);
                        }
                    }
                };
            })
        ];

        api.menus.open({
            type: 'list',
            subtitle: pack.author ? 'by ' + pack.author : 'EZinstall',
            title: pack.name,
            items
        });
    }

    function openExportMenu(api) {
        const games = api.games.getAll();

        let gamesHtml = games.map(g => `
            <label style="display:flex; align-items:center; gap:12px; padding:8px 0; cursor:pointer;">
                <input type="checkbox" class="ez-export-cb" value="${g.id}" checked style="width:16px;height:16px;">
                <i data-lucide="${g.icon || 'gamepad-2'}" style="width:18px;height:18px;opacity:0.7"></i>
                <span>${g.name}</span>
            </label>
        `).join('');

        const html = `
            <div style="padding: 0 24px;">
                <div style="margin-bottom: 24px;">
                    <label style="display:block; font-size:12px; color:rgba(255,255,255,0.5); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.05em;">Pack Name</label>
                    <input type="text" id="ez-ex-name" placeholder="My Game Pack" style="width:100%; background:transparent; border:1px solid rgba(255,255,255,0.2); padding:10px 14px; color:white; outline:none; font-family:inherit;" value="My Custom Pack">
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="display:block; font-size:12px; color:rgba(255,255,255,0.5); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.05em;">Author (Optional)</label>
                    <input type="text" id="ez-ex-auth" placeholder="Your Name" style="width:100%; background:transparent; border:1px solid rgba(255,255,255,0.2); padding:10px 14px; color:white; outline:none; font-family:inherit;">
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="display:block; font-size:12px; color:rgba(255,255,255,0.5); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.05em;">Description (Optional)</label>
                    <input type="text" id="ez-ex-desc" placeholder="A collection of fun games" style="width:100%; background:transparent; border:1px solid rgba(255,255,255,0.2); padding:10px 14px; color:white; outline:none; font-family:inherit;">
                </div>

                <div style="margin-bottom: 24px;">
                    <label style="display:block; font-size:12px; color:rgba(255,255,255,0.5); margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">Select Games to Include</label>
                    <div style="max-height: 240px; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); padding: 12px; background: rgba(0,0,0,0.2);" class="custom-scrollbar">
                        ${gamesHtml || '<div style="color:rgba(255,255,255,0.3);font-size:14px;padding:8px;">No games in library</div>'}
                    </div>
                </div>

                <div style="display:flex; gap:12px; margin-top:32px;">
                    <button id="ez-ex-dl" style="padding: 12px 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color:white; cursor:pointer; flex:1; transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">Download JSON</button>
                    <button id="ez-ex-copy" style="padding: 12px 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color:white; cursor:pointer; flex:1; transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">Copy Data URI</button>
                </div>
            </div>
        `;

        api.menus.open({
            type: 'html',
            subtitle: 'EZinstall',
            title: 'Export Game Pack',
            html: html
        });

        setTimeout(() => {
            function getPackData() {
                const name = document.getElementById('ez-ex-name').value.trim() || 'Untitled Pack';
                const auth = document.getElementById('ez-ex-auth').value.trim();
                const desc = document.getElementById('ez-ex-desc').value.trim();
                const selectedIds = Array.from(document.querySelectorAll('.ez-export-cb:checked')).map(cb => cb.value);

                const selectedGames = games.filter(g => selectedIds.includes(g.id));

                if (selectedGames.length === 0) {
                    api.toast.simple('Please select at least one game');
                    return null;
                }

                return {
                    name,
                    author: auth || undefined,
                    description: desc || undefined,
                    version: '1.0',
                    games: selectedGames
                };
            }

            document.getElementById('ez-ex-dl')?.addEventListener('click', () => {
                const pack = getPackData();
                if (!pack) return;
                const blob = new Blob([JSON.stringify(pack, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = pack.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_pack.json';
                a.click();
                URL.revokeObjectURL(url);
                api.toast.simple('Pack downloaded!');
            });

            document.getElementById('ez-ex-copy')?.addEventListener('click', () => {
                const pack = getPackData();
                if (!pack) return;
                const jsonStr = JSON.stringify(pack);
                const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStr);
                navigator.clipboard.writeText(dataUri).then(() => {
                    api.toast.simple('Data URI copied to clipboard!');
                }).catch(() => {
                    api.toast.simple('Failed to copy. Pack might be too large.');
                });
            });
        }, 100);
    }

    return { openPackBrowser, fetchAndShowPack, showPackMenu, openExportMenu };
})();
