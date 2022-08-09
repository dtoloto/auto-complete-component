import React, { FormEvent, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'
import { getData } from '../../services'

interface IResults {
  value: string
  label: string
}

export const SearchInput: React.FC = () => {
  const [results, setResults] = useState<IResults[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce(searchValue, 500)
  const [loading, setLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = async (event: FormEvent<HTMLInputElement>) => {
    const { value } = event?.currentTarget
    if (!value) {
      setSearchValue('')
      setInputValue('')
      setResults([])
      return
    }
    const upperCaseValue = value?.toUpperCase()
    setInputValue(value)
    setSearchValue(upperCaseValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getData()
        const filteredData = response?.filter((item) => item?.toUpperCase()?.indexOf(debouncedSearch) === 0)
    
        const styledData = filteredData?.slice(0, 10)?.map(item => {
          const splitedWord = item?.toUpperCase()?.split(debouncedSearch).slice(1).join(debouncedSearch)
          const formattedWord = `<p><strong>${debouncedSearch}</strong>${splitedWord}</p>`
          return {
            value: item,
            label: formattedWord
          }
        })
    
        setResults(styledData)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }

    if (debouncedSearch) {
      fetchData()
    } else {
      setResults([])
    }
  }, [debouncedSearch])

  const selectUniversity = (value: string) => {
    setResults([])
    setInputValue(value)
  }

  return (
    <div>
      <input 
        type="text" 
        onChange={handleChange} 
        placeholder="USA Universities" 
        value={inputValue}
      />
      <div>
        {(results?.length > 0 || loading) && (
          <ul>
            {results.map((result, i) => (
              // DEFINETLY, THE USE OF THE INDEX AS KEY IS NOT RECOMMENDED,
              // BUT THE API HAS SOME DUPLICATED VALUES, SO IT'S A PROVISORY SOLUTION 
              // HOPE YOU UNDERSTAND :)
              <li 
                className="result"
                key={`${i}-${result}`} 
                dangerouslySetInnerHTML={{ __html: result?.label }}
                onClick={() => {selectUniversity(result?.value)}}
              />
            ))}

            {loading && results?.length === 0 && (
              <li>
                <p>Loading...</p>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
