import Material from './Material.js';

class DepthTexture extends Material{
    constructor(shader, ambient, diffuse, specular, shininess, slot, texture)
    {
        super(shader, ambient, diffuse, specular, shininess);
        this.slot = slot;
        this.texture = texture;
    }

    bind()
    {
        this.shader.bind();
        this.gl.activeTexture(this.gl.TEXTURE0 + this.slot);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.shader.setUniform1i("uTexture", this.slot);
    }
}

export default DepthTexture