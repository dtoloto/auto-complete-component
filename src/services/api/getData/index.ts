// const countryData = [
//   'Brasil',
//   'Argentina',
//   'Peru',
//   'Chile',
//   'Bolivia',
//   'Paraguai',
//   'Uruguai',
// ]

export const getData = async () => {
  // local data
  // await new Promise(resolve => setTimeout(resolve, 2000));
  // return countryData
  const response = await fetch('http://universities.hipolabs.com/search?country=United+States')
  const data = await response?.json()
  const universityNames: string[] = data?.map((item: any) => item?.name )
  return universityNames
}