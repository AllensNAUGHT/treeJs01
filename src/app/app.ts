import { Color, Mesh, PerspectiveCamera, Scene, Vector3, WebGLRenderer, BoxGeometry, MeshPhongMaterial, DirectionalLight, Object3D,MeshBasicMaterial, SphereGeometry} from 'three';
import { Brick } from './brick';

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });



  private brick: Mesh;
  private sphere: Mesh;

  constructor() {
    let size = 100;
    let color = new Color('rgb(255,0,0)');

    /* DEBUT DU C/V */
    this.brick=new Mesh();
      // this.brick = new Brick(100, new Color('rgb(255,0,0)'));
    this.scene.add(this.brick);
    this.brick.geometry = new BoxGeometry(size, size, size);
// this.brick.geometry = new SphereGeometry(size, size, size);
// THREE.Geometry >>>>>>>>>>> pour voir les differentes formes 


    //MeshPhong : vertex shader calcul une lumiere
    //material : vertex shader fragment shader 
    this.brick.material = new MeshPhongMaterial({ color });
    /* fin DU C/V */

 /* ************* CREATION D'un nouvel element ************  */

    this.sphere=new Mesh();
    // this.brick = new Brick(100, new Color('rgb(255,0,0)'));
  this.scene.add(this.sphere);
 
  this.sphere.geometry = new SphereGeometry(50,24,24);
  this.sphere.position.set(0,50,0);
// this.brick.geometry = new SphereGeometry(size, size, size);
// THREE.Geometry >>>>>>>>>>> pour voir les differentes formes 


  //MeshPhong : vertex shader calcul une lumiere
  //material : vertex shader fragment shader 
  this.sphere.material = new MeshPhongMaterial({ color });



    //param : couleur de la lumiere et intensity 
    const directionalLight = new DirectionalLight( 0xffffff, 0.5 );
     //object3d point dans l'espace avec coordo rotations taille etc
     //point d'arrivé de la lumiere
    directionalLight.target = new Object3D();

    // ajoute la cible de la lumiere a notre scene
    this.scene.add( directionalLight.target);

    // la position de la cible de la lumiere on l'assigne a -55 -55 ... 
    //CIBLE 
    directionalLight.target.position.copy(new Vector3(-55, -55, -55));
   
    //POINT DE DEPART
    directionalLight.position.copy(new Vector3(0, 0, 0));
    this.scene.add( directionalLight );
    //ajoute la lumiere à la scene 
  
    this.camera.position.set(200, 200, 200);
    //regarde vers 000
    this.camera.lookAt(new Vector3(0, 0, 0));
//renderer : resolution > taille de la fenetre innerH inner V > taille du navigateur
    this.renderer.setSize(innerWidth, innerHeight);
    //background
    this.renderer.setClearColor(new Color(0,1,0));

    //clic droit go to definition > fonction de rendu  
    this.render();
  }



  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    // on demande au renderer de treejs de rendre une scene avec ( telle scene et telle camera) 
    this.renderer.render(this.scene, this.camera);
    //on dit a js de refaire un rendu de la scene a la prochaine frame
    //premiere fois constructeur on appelle le rendu puis a la prochaine frame on recup rendu etc etc a l'infini 
    //demande a js : a la prochaine frame de rendu de rappeler la fonction random 
    requestAnimationFrame(() => this.render());

    //adapte la camera et le renderer , au cas ou changement de taille on recuperer les parametres
    this.adjustCanvasSize();
    this.brick.rotateZ(0.02);
    this.brick.rotateX(0.02);
  }
}
