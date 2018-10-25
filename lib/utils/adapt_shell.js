import { getDeviceInfo } from './device_info';

/**
 * Search and control elements class-es using data attributes.
 */
export default class AdaptShell {
  /**
   * @param {HTMLElement} [root] - root where to search the elements, default: body
   */
  constructor(root) {
    this.listener = this.onResize.bind(this);
    this.nodes = [];
    this.root = root || document.body;
    this.currentType = getDeviceInfo().type;
    window.addEventListener('resize', this.listener);
    this.searchForNodes();
    this.onResize();
  }

  searchForNodes() {
    const nodesMobile = this.root.querySelectorAll('[data-classnamemobile]');
    const nodesTablet = this.root.querySelectorAll('[data-classnametablet]');

    this.nodes = Array.prototype.slice.call(nodesMobile)
      .concat(Array.prototype.slice.call(nodesTablet));
  }

  processClasses() {
    for (let i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i]) {
        if (this.currentType === 'mobile' && this.nodes[i].dataset.classnamemobile) {
          this.nodes[i].className = this.nodes[i].dataset.classnamemobile;
        } else if (this.currentType === 'tablet' && this.nodes[i].dataset.classnametablet) {
          this.nodes[i].className = this.nodes[i].dataset.classnametablet;
        } else {
          this.nodes[i].className = this.nodes[i].dataset.classnamedesktop;
        }
      }
    }
  }

  onResize() {
    const { type } = getDeviceInfo();

    if (type !== this.currentType) {
      this.currentType = type;
      this.searchForNodes();
      this.processClasses();
    }
  }

  destroy() {
    window.removeEventListener('resize', this.listener);
    this.nodes = [];
  }
}
