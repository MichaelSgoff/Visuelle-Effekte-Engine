import GL from "./GL.js";
import Material from './Material.js';

class Texture extends Material{
    constructor(shader, ambient, diffuse, specular, shininess, path, slot)
    {
        super(shader, ambient, diffuse, specular, shininess);
        const gl = this.gl = GL.getGL();
        this.path = path;
        this.slot = slot;
        this.buffer = 0;
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Fill the texture with a 1x1 red pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([255, 0, 0, 255])); // red

        // Asynchronously load an image.
        this.image = new Image();
        this.image.src = path;
        this.image.crossOrigin = "";
        this.image.addEventListener('load', () => 
        {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            gl.generateMipmap(gl.TEXTURE_2D);
        });

        this.image.addEventListener('error', function(event)
        {
            console.error("Ein Fehler bei Laden der Textur '" + path + "' ist aufgetreten.")            
            console.log(event);
        });
    }

    bind()
    {
        //super.bind();
        this.shader.bind();
        this.shader.setUniform3f("material.ambient", this.ambient[0], this.ambient[1], this.ambient[2]);
        this.shader.setUniform1i("material.specular", this.slot);
        this.shader.setUniform1f("material.shininess", this.shininess);
        this.gl.activeTexture(this.gl.TEXTURE0 + this.slot);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.shader.setUniform1i("material.diffuse", this.slot);
    }

}

export default Texture