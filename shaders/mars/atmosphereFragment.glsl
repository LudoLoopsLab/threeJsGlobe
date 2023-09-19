varying vec3 vertexNormal;

void main() {

  float intensity = pow(0.6 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 3.0);

  gl_FragColor = vec4(0.81, 0.35, 0.19, 0.75) * intensity;

}

// rgb(190, 102, 72)