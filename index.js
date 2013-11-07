// http://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation
// and also taken largely from: THREE.js
// http://threejsdoc.appspot.com/doc/three.js/src.source/core/Quaternion.js.html


function _quaternion(x, y, z, w){

  if(!x) x = 0; if(!y) y = 0; if(!z) z = 0
  if(w === undefined) w = 1 // 0 is a valid value for w so don't change it to 1
  
  function quaternion(){ }

  // returns a new quaternion which is this quaternion, right multiplied by `q`
  quaternion.multi = function(q){
    q = q.array()
    return _quaternion( 
          x * q[3]  +  y * q[2]  -  z * q[1]  +  w * q[0]
      , - x * q[2]  +  y * q[3]  +  z * q[0]  +  w * q[1]
      ,   x * q[1]  -  y * q[0]  +  z * q[3]  +  w * q[2]
      , - x * q[0]  -  y * q[1]  -  z * q[2]  +  w * q[3]
    )
  }
  
  quaternion.coords = function(){
    return { x: x, y: y, z: z, w: w }
  }

  quaternion.array = function(){
    return [x, y, z, w]
  }

  quaternion.inverse = function(){
    return _quaternion(x * -1, y * -1, z * -1)
  }

  quaternion.size = function(){
    return Math.sqrt(x*x + y*y + z*z + w*w)
  }

  quaternion.norm = function(){
    var l = this.size()
    if(l === 0) return _quaternion(0, 0, 0, 0)
    else return _quaternion(x / l, y / l, z / l, w / l)
  }

  quaternion.add = function(x_, y_, z_, w_){
    // of the form: `q1.add(q2)`
    if(isNaN(x_)) return x_.add(x, y, z, w)
    // addition of the just scaler component. of the form: `q1.add(n)`
    else if(y_ === undefined) return _quaternion(x, y, z, w + x_)
    // of the form: `q1.add(x, y, z, w)`
    else return _quaternion(x + x_, y + y_, z + z_, w + w_)
  }

  quaternion.fromAxis = function(axis, angle){
    // see: http://www.genesis3d.com/~kdtop/Quaternions-UsingToRepresentRotation.htm
    // q = (s, v_vec)
    // s = cos(theta / 2)
    // v = u_vec * sin (theta / 2)
    var halfAngle = angle / 2, s = Math.sin(halfAngle)
    return _quaternion(axis.x * s, axis.y * s, axis.z * s, Math.cos(halfAngle))
  }

  quaternion.fromEuler = function(vec){
    var c = Math.PI / 360
      , x = vec.x * c
      , y = vec.y * c
      , z = vec.z * c
      , c1 = Math.cos( y  )
      , s1 = Math.sin( y  )
      , c2 = Math.cos( -z )
      , s2 = Math.sin( -z )
      , c3 = Math.cos( x  )
      , s3 = Math.sin( x  )
      , c1c2 = c1 * c2
      , s1s2 = s1 * s2
    return _quaternion(
      c1c2 * s3  + s1s2 * c3
      , s1 * c2 * c3 + c1 * s2 * s3
      , c1 * s2 * c3 - s1 * c2 * s3
      , c1c2 * c3  - s1s2 * s3
    )
  }

  quaternion.multiVec = function(vec){
    if(vec instanceof Array) vec = { x: vec[0], y: vec[1], z: vec[2] }
    // quaternion * vec
    var x_ =  w * vec.x  +  y * vec.z  -  z * vec.y
      , y_ =  w * vec.y  +  z * vec.x  -  x * vec.z
      , z_ =  w * vec.z  +  x * vec.y  -  y * vec.x
      , w_ = -x * vec.x  -  y * vec.y  -  z * vec.z
    // vec * quaternion^-1
    return [
        // note: possible future per. opt. in signs
        x_ * w  +  w_ * -x  +  y_ * -z  -  z_ * -y
      , y_ * w  +  w_ * -y  +  z_ * -x  -  x_ * -z
      , z_ * w  +  w_ * -z  +  x_ * -y  -  y_ * -x
    ]
  }

  quaternion.toString = function(){
    return '[x=' + x + ', y=' + y + ', z=' + z + ', w=' + w + ']'
  }
  return quaternion
}

module.exports = _quaternion