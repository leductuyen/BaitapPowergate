import axios from 'axios'
import React, { useState, useEffect } from 'react'
interface Country {
    id: number
    name: string
}
interface Province {
    id: number
    name: string
    data?: {
        [key: string]: any
    }
}
const Test = () => {
    //! State
    const [countries, setCountries] = useState<Country[]>([])
    const [country, setContries] = useState<Province[]>([])

    const [selectedCountry, setSelectedCountry] = useState<number | ''>('')

    //! Function
    const handleCountryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        console.log(event.target.value)
    }
    //! Effect
    useEffect(() => {
        // Lấy danh sách quốc gia từ API và đổ vào select đầu tiên
        axios
            .get('http://api.training.div3.pgtest.co/api/v1/location')
            .then((response) => {
                setCountries(response?.data?.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    useEffect(() => {
        if (selectedCountry) {
            axios
                .get(
                    `http://api.training.div3.pgtest.co/api/v1/location?pid=${selectedCountry}`
                )
                .then((response) => {
                    setContries(response?.data?.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedCountry])

    return (
        <div>
            <select onChange={handleCountryChange}>
                <option value="">Chọn quốc gia</option>
                {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
            <label>Tỉnh:</label>
            <select>
                <option value="">Chọn tỉnh</option>
                {country.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Test
