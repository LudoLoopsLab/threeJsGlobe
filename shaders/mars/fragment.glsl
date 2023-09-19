uniform sampler2D globeTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {

  float intensity = 0.700 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));

  vec3 atmosphere = vec3(2.81, 0.35, 0.19) * pow(intensity, 1.5);

  // vec3 atmosphere = vec3(0, 0, 0);

  gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
}