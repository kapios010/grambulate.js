import { getHeapStatistics } from "v8";

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
    let initMem = getHeapStatistics().number_of_native_contexts;
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
    //Check for 0,0
    if(numA == deg) {
        ptA = {x: 0, y: 0}
    }
    if(numB == deg) {
        ptB = {x: 0, y: 0}
    }
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

        if(getHeapStatistics().number_of_native_contexts > initMem) {
            throw new Error("Memory leak detected. Exiting.")
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
                if(getHeapStatistics().number_of_native_contexts > initMem) {
                    throw new Error("Memory leak detected. Exiting.")
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
            if(getHeapStatistics().number_of_native_contexts > initMem) {
                throw new Error("Memory leak detected. Exiting.")
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
    //Check for 0,0
    if(numA == deg) {
        ptA = {x: 0, y: 0}
    }
    if(numB == deg) {
        ptB = {x: 0, y: 0}
    }
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
        if(getHeapStatistics().total_heap_size / getHeapStatistics().heap_size_limit > 0.95) {
            throw new Error("Exceeded memory usage threshold. (95%)")
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
                if(getHeapStatistics().total_heap_size / getHeapStatistics().heap_size_limit > 0.95) {
                    throw new Error("Exceeded memory usage threshold. (95%)")
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
            if(getHeapStatistics().total_heap_size / getHeapStatistics().heap_size_limit > 0.95) {
                throw new Error("Exceeded memory usage threshold. (95%)")
            }     
        }
    }

    return numC;
}

export const calculatePosLevel = function(num:number, deg?:number) : number {
    num = Math.trunc(num);
    deg = Math.trunc(deg || 1);
    if(num < deg) {
        throw new Error("Incorrect function input(s).");
    }
    let result:number;
    if(num == deg) {
        return 0;
    }
    // Equation courtesy of @DDMPlayer
    result = Math.floor((Math.sqrt(Math.floor(((num-(deg-1))-2)/8) * 8 + 1) - 1)/2) + 1;
    return result;
}   

export const calculateNegLevel = function(num:number, deg?:number): number {
    num = Math.trunc(num);
    deg = Math.trunc(deg || -1);
    if(num > deg) {
        throw new Error("Incorrect function input(s).");
    }
    let result:number;
    if(num == deg) {
        return 0;
    }
    // Equation courtesy of @DDMPlayer modified to fit the negative spiral by Kapios (hopefully well)
    result = Math.floor((Math.sqrt(Math.floor((-(num-(deg+1))-2)/8) * 8 + 1) - 1)/2) + 1;
    return result;
}