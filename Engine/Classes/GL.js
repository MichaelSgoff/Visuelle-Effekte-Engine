class GL {
    static loadGL(canvas) {
        return GL.instance = canvas.getContext('webgl2', {alpha: true, depth: true});
    }

    static getGL() {
        return GL.instance;
    }
}

export default GL;