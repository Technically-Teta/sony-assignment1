
let nums = [0,1,0,3,12];

let zeros = 0;// begining
let nonZeros = nums.length -1; //end of the array

//I am saying while the begining of the loop is less than the end, I will increment the begininig of the loop if the begiing part of the array is not equal to zero
while(zeros <= nonZeros){
  if(nums[zeros] != 0){
     zeros++
  } else{
 //here I will swap positions of the begining elements to the end elements if the first elements of the array is not zero   
    [nums[zeros], nums[nonZeros]] = [nums[nonZeros],nums[zeros]]
  }
}

console.log(nums)
