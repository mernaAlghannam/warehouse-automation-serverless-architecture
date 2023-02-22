/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IStudentsGrades , IClassAssignments, IGrades, IUniversityClass} from "../types/api_types";
import {BASE_API_URL, MY_BU_ID} from "../globals";

/**
 * This is an async/wait function. It fetches any data from an API by giving it APIURL
 * 
 * @param APIURL The url of the API that needs to be called
 * @returns res.json() of type type any returned by the HTTP request call.
 */
const fetchAnyData = async (APIURL:string): Promise<any> => {
  const res = await fetch(APIURL, {
    method: "GET",
    headers: {
      'accept': 'application/json',
      'x-functions-key': 'fKZTwhwT1DV64q_JzG6sYoShfq-cJbPwBgjIMOImYSTiAzFuv4-H5g=='},
    });

  return await res.json();
}

/**
 * 
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * @param studentID The ID of the student for which we want to calculate the final grade
 * @param classAssignments list of all assignments in class
 * @param klass class information
 * @returns IStudentsGrades data structure that has information about student and their final grade.
 */
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: IClassAssignments[],
  klass: IUniversityClass
): Promise<IStudentsGrades> {

  let finalGrade = 0

  // Get all assignment grades for student with ID studendID in class
  const gradeInfo: IGrades = await fetchAnyData(BASE_API_URL+"/student/listGrades/"+studentID+"/"+klass.classId+"?buid="+MY_BU_ID)
  // get only grade to assignment map from gradesInfo
  const grades = gradeInfo.grades[0]
  
  //Add all assigment grades to calculate student final grade
  for (var i in classAssignments){
    // get only assignment ID from classAssignments of type IClassAssignment
    let assignmentID = classAssignments[i].assignmentId

    // Add to student final grade using the combination of assignment grade and assignment weight
    finalGrade+= (Number(grades[assignmentID])/100)*Number(classAssignments[i].weight)
  }

  // return struct with a student information, their grades, and the class they are in
  return {studentId: studentID, studentName: gradeInfo.name, classId: klass.classId, className: klass.title, semester: klass.semester, grade: Number(finalGrade.toFixed(1))};
}

/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns IStudentsGrades[] data structure that has a list of each student and their final grade.
 */
export async function calcAllFinalGrade(classID: string): Promise<IStudentsGrades[]> {
  let studentGrades: IStudentsGrades[] = [];
  
  // fetch all students names in the class
  let studentIdList : string[] = await fetchAnyData(BASE_API_URL+"/class/listStudents/"+classID+"?buid="+MY_BU_ID)
  // fetch the class details, i.e. semester and class title
  let klass: IUniversityClass = await fetchAnyData(BASE_API_URL+"/class/GetById/"+classID+"?buid="+MY_BU_ID)
  // fetch all assignments in the class
  let assignmentList : IClassAssignments[] = await fetchAnyData(BASE_API_URL+"/class/listAssignments/"+classID+"?buid="+MY_BU_ID)


  //add each student grade and their information into studentGrades list
  for (var studentID of studentIdList){
    studentGrades.push(await calculateStudentFinalGrade(studentID, assignmentList, klass))
  };

  // returns the grades for each student and all other information in IStudentsGrades interface
  return studentGrades;
}
