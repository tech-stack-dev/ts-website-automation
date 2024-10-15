class ArrayUtils {
    public mergeTwoArraysToMap(keyArray: any[], valueArray: any[]) : Map<any, any>{ 
        return new Map(
			keyArray.map((index: any, i: number) => [index, valueArray[i]])
		  ); 
    }
}

const arrayUtils = new ArrayUtils();
export {arrayUtils};