// state.mjs
class StateManager {
  constructor() {
    this._state = {
      urlManager: null,
      sidebar: null,
      initialized: false,
    };
  }

  initialize(sidebar, urlManager) {
    if (this._state.initialized) {
      console.warn("🚫 Attempted to reinitialize state");
      return;
    }

    console.log("🏗️ Initializing application state");
    this._state.sidebar = sidebar;
    this._state.urlManager = urlManager;
    this._state.initialized = true;
    console.log("✅ State initialized");
  }

  get urlManager() {
    if (!this._state.initialized) {
      throw new Error("Accessing urlManager before state initialization");
    }
    return this._state.urlManager;
  }

  get sidebar() {
    if (!this._state.initialized) {
      throw new Error("Accessing sidebar before state initialization");
    }
    return this._state.sidebar;
  }

  isInitialized() {
    return this._state.initialized;
  }
}

export const state = new StateManager();
