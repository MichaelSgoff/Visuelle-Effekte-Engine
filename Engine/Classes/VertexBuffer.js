import GL from "./GL.js";
const gl = GL.getGL();

class VertexBuffer {
    constructor(data)
    {
        const gl = this.gl = GL.getGL();
        this.buffer = gl.createBuffer();
        this.data = data;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.data), gl.STATIC_DRAW);
    }

    bind()
    {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    }

    cleanup()
    {
        this.gl.deleteBuffer(this.buffer);
    }
}

export default VertexBuffer