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
  // await new Promise(resolve => setTimeout(resolve, 2000))
  // return countryData

  // THIS IS BEING IMPLEMENTED FOR DEMO PURPOSE, 
  // SINCE UNIVERSITIES API IS NOT USING SSL CONNECTION
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://auto-complete-component-six.vercel.app/data.json' 
    : 'http://universities.hipolabs.com/search?country=United+States'

  const response = await fetch(API_URL)
  const data = await response?.json()
  const universityNames: string[] = data?.map((item: any) => item?.name )
  return universityNames
}