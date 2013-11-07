# QuaternionJS

a simple API for creating an manipulating quaternions which are useful in 3D graphics involving rotations.

to use in the browser, just include `<script src="quaternion.js"></script>`

for use in node, just run `npm install quaternionjs`

Here's a small demo

````js
  var quaternion = require('quaternionjs')
  var q = quaternion()
    .fromAxis({x: 1, y: 0, z: 0}, theta)
    .multi(quaternion().fromAxis({x: 0, y: 1, z: 0}, theta))
    .multi(quaternion().fromAxis({x: 0, y: 0, z: 1}, theta))
  // rotate all the points in `points` along the x, y, and z axis
  return points.slice(0).map(q.multiVec)
````

checkout `example/index.html` for an demo or have a gander at the source code.

