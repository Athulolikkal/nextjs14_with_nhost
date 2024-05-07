export const addCourseQuery = (
  creatorData: string,
  descriptionData: string,
  priceData: string,
  imageUrl: string,
  tagData: string,
  titleData: string,
  courseType: string,
  slNoData:string,
) => `
mutation addCourse {
    insert_course_details_one(object: {creator: "${creatorData}", description: "${descriptionData}", price: "${priceData}", profile: "${imageUrl}", tag: "${tagData}", title: "${titleData}", type: "${courseType}",sl_no:"${slNoData}"}) {
      id
    }
  }
`;
