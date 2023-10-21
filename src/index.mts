interface coordSet {
    x:number,
    y:number,
}

interface numberM {
    [index: number]: {
        [index:number] : number ;
    } 
}

export const grambulatePos = function(numA:number, numB:number, deg?:number) : number {
    // Truncate numbers
    numA = Math.trunc(numA);
    numB = Math.trunc(numB);
    deg = Math.trunc(deg || 1);
    // Setup errors
    if(numA < deg || numB < deg) {
        throw new Error("Incorrect function input(s).");
    }
    // Initial return
    if(numA == numB) return numA;
    // Variable declarations
    let graMap : numberM = {};
    let ring : number = 1;
    let ptA : coordSet | undefined;
    let ptB : coordSet | undefined;
    let ptCur : coordSet = { x: 0, y: 0};
    let n:number = deg;
    // The Loop
    graMap[ptCur.y] = {};
    graMap[ptCur.y][ptCur.x] = n
    n++;
    while (!ptA || !ptB) {
        if(ring % 2 != 0) {
            for(let i = 0; i < ring; i++) {
                ptCur.x++;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n++;
            }
            for(let i = 0; i < ring; i++) {
                ptCur.y++;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n;
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n++;
            }
            ring++
        } else {
            for(let i = 0; i < ring; i++) {
                ptCur.x--;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n;
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n++;
            }
            for(let i = 0; i < ring; i++) {
                ptCur.y--;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n;
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n++;
            }
            ring++
        }

    }
    // Calculate the vector and the position of point C
    let vector: coordSet = { x: ptB.x - ptA.x, y: ptB.y - ptA.y }
    let ptC: coordSet = { x: ptB.x + vector.x, y: ptB.y + vector.y}
    let numC: number | undefined;
    // Check if ptC exists on the map otherwise calculate it
    if(graMap[ptC.y]) {
        if(graMap[ptC.y][ptC.x]) {
            return graMap[ptC.y][ptC.x]
        } else {
            while (!numC) {
                if(ring % 2 != 0) {
                    for(let i = 0; i < ring; i++) {
                        ptCur.x++;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n++;
                    }
                    for(let i = 0; i < ring; i++) {
                        ptCur.y++;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n;
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n++;
                    }
                    ring++
                } else {
                    for(let i = 0; i < ring; i++) {
                        ptCur.x--;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n;
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n++;
                    }
                    for(let i = 0; i < ring; i++) {
                        ptCur.y--;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n;
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n++;
                    }
                    ring++
                }
        
            }
        }
    } else {
        while (!numC) {
            if(ring % 2 != 0) {
                for(let i = 0; i < ring; i++) {
                    ptCur.x++;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n++;
                }
                for(let i = 0; i < ring; i++) {
                    ptCur.y++;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n;
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n++;
                }
                ring++
            } else {
                for(let i = 0; i < ring; i++) {
                    ptCur.x--;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n;
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n++;
                }
                for(let i = 0; i < ring; i++) {
                    ptCur.y--;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n;
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n++;
                }
                ring++
            }
    
        }
    }

    return numC;
}

export const grambulateNeg = function(numA:number, numB:number, deg?:number) : number {
    // Truncate numbers
    numA = Math.trunc(numA);
    numB = Math.trunc(numB);
    deg = Math.trunc(deg || -1);
    // Setup errors
    if(numA > deg || numB > deg) {
        throw new Error("Incorrect function input(s).");
    }
    // Initial return
    if(numA == numB) return numA;
    // Variable declarations
    let graMap : numberM = {};
    let ring : number = 1;
    let ptA : coordSet | undefined;
    let ptB : coordSet | undefined;
    let ptCur : coordSet = { x: 0, y: 0};
    let n:number = deg;
    // The Loop
    graMap[ptCur.y] = {};
    graMap[ptCur.y][ptCur.x] = n
    n++;
    while (!ptA || !ptB) {
        if(ring % 2 != 0) {
            for(let i = 0; i < ring; i++) {
                ptCur.x++;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n--;
            }
            for(let i = 0; i < ring; i++) {
                ptCur.y++;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n;
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n--;
            }
            ring++
        } else {
            for(let i = 0; i < ring; i++) {
                ptCur.x--;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n;
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n--;
            }
            for(let i = 0; i < ring; i++) {
                ptCur.y--;
                if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                graMap[ptCur.y][ptCur.x] = n;
                if(n == numA) {
                    ptA = {x: ptCur.x, y:ptCur.y}
                }
                if(n == numB) {
                    ptB = {x: ptCur.x, y:ptCur.y}
                }
                n--;
            }
            ring++
        }

    }
    // Calculate the vector and the position of point C
    let vector: coordSet = { x: ptB.x - ptA.x, y: ptB.y - ptA.y }
    let ptC: coordSet = { x: ptB.x + vector.x, y: ptB.y + vector.y}
    let numC: number | undefined;
    // Check if ptC exists on the map otherwise calculate it
    if(graMap[ptC.y]) {
        if(graMap[ptC.y][ptC.x]) {
            return graMap[ptC.y][ptC.x]
        } else {
            while (!numC) {
                if(ring % 2 != 0) {
                    for(let i = 0; i < ring; i++) {
                        ptCur.x++;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n--;
                    }
                    for(let i = 0; i < ring; i++) {
                        ptCur.y++;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n;
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n--;
                    }
                    ring++
                } else {
                    for(let i = 0; i < ring; i++) {
                        ptCur.x--;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n;
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n++;
                    }
                    for(let i = 0; i < ring; i++) {
                        ptCur.y--;
                        if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                        graMap[ptCur.y][ptCur.x] = n;
                        if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                            numC = n;
                        }
                        n--;
                    }
                    ring++
                }
        
            }
        }
    } else {
        while (!numC) {
            if(ring % 2 != 0) {
                for(let i = 0; i < ring; i++) {
                    ptCur.x++;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n--;
                }
                for(let i = 0; i < ring; i++) {
                    ptCur.y++;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n;
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n--;
                }
                ring++
            } else {
                for(let i = 0; i < ring; i++) {
                    ptCur.x--;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n;
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n--;
                }
                for(let i = 0; i < ring; i++) {
                    ptCur.y--;
                    if(!graMap[ptCur.y]) graMap[ptCur.y] = {};
                    graMap[ptCur.y][ptCur.x] = n;
                    if(ptCur.x == ptC.x && ptCur.y == ptC.y) {
                        numC = n;
                    }
                    n--;
                }
                ring++
            }
    
        }
    }

    return numC;
}