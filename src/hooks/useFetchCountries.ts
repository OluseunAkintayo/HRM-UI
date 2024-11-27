import React from 'react';
import axios, { AxiosError } from 'axios';

interface ICountry {
  name: {
    common: string;
  }
}

export const useFetchCountries = () => {
  const [data, setData] = React.useState<Array<ICountry> | null>(null);
  const [error, setError] = React.useState<AxiosError | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const url = "https://restcountries.com/v3.1/all";
  React.useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        const countriesData: Array<ICountry> = 
          response.data.map((item: ICountry) => {
            return {
              name: { common: item.name.common }
            }
          }).sort((a: ICountry, b: ICountry) => a.name.common.localeCompare(b.name.common));
        setData(countriesData);
        setLoading(false);
      } catch (error) {
        setError(error instanceof AxiosError ? error : error as AxiosError);
        setLoading(false);
      }
    }
    getItems();
  }, []);
  return { loading, error, data };
}
