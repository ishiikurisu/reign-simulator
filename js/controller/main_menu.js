function MainMenuController() {
    this.view = new MainMenuView();

    this.setup = () => {
        this.view.draw(this);
    }

    this.update = () => { }

    this.draw = () => { }
}
