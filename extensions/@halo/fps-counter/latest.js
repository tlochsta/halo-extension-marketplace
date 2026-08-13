LauncherExtension({
  id: 'ext-fps-counter',
  name: 'FPS Counter',
  version: '1.0.1',
  description: 'Displays a real-time frames-per-second indicator overlay and system widget.',
  load(api) {
    let div = document.getElementById('ext-fps-overlay');
    if (!div) {
      div = document.createElement('div');
      div.id = 'ext-fps-overlay';
      div.setAttribute('data-ext-id', 'ext-fps-counter');
      div.className = 'fixed top-4 right-4 bg-black/60 border border-white/10 px-3 py-1.5 rounded text-xs font-mono text-green-400 z-50 pointer-events-none';
      document.body.appendChild(div);
    }
    
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;
    
    function update() {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastTime));
        div.textContent = `FPS: ${fps}`;
        frameCount = 0;
        lastTime = now;
      }
      if (document.getElementById('ext-fps-overlay')) {
        api._fpsAnimationFrame = requestAnimationFrame(update);
      }
    }
    update();

    api.widgets.add({
      id: 'fps-widget',
      render(container) {
        container.innerHTML = `
          <div class="flex items-center gap-2 text-white h-full px-2" style="font-size:11px;">
            <i data-lucide="activity" class="w-3.5 h-3.5 text-green-400"></i>
            <span>FPS:</span>
            <span class="font-mono text-green-400 font-bold">${fps}</span>
          </div>
        `;
        lucide.createIcons({ nodes: [container] });
      }
    });
  }
});
