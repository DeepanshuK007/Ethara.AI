
ODM(Obj data modelling): This is a tech to bridge obj oriented prog to no sql based json databases, enabling devs to map directly code objs to json like docs.
Ex - Mongoose (based on node.js)

JSON web token(JWT)- secure way to send and receive data between client and server

Hot Module replacement(HMR)- instantly updates the browser modules at specific locs where needed instead of loading the whole web page. Supported in Vite

React Router Dom is a standard lib use dfor routing in case of react based frontend. It is used for creating Single Page Applications(SPA) to navigate between pages.

cors() is used when we initiate our backend, to allow our react app to fetch data

----------------------------------------------------------------

In shalow copy the prtr stills poinst toward the same memory add so if u change the vaule of the obj which is copy will not change as iits ptr is not pointing towards a new mem block but to the same obj1 block and thus if the change of obj1 prt is also reflected in the copy obj. 
Using deep copy the ptr of obj2 points tot he new mem block and thus the change of values will be independent for obj1 and obj2

*p = new double* this one line in case of deep copy allocs the p pntr to the new mom add of float type.
*p = (obj.p)* this line will then alloc the value of p to that mem of the 2nd obj copied 