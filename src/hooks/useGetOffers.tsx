import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type Offer = {
  _id: string;
  createdAt: string;
  description: string;
  image: string;
  isRemote: boolean;
  page: string;
  slug: string;
  technologies: Array<string>;
  title: string;
  workLocation: string;
};

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

async function fetchOffers(queryString: string) {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/offer?" + queryString,
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_AUTH_KEY,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const useGetOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchOffers(queryString);
      setOffers(response.offers);
      setPagination(response.pagination);
    };
    fetchData();
  }, [queryString]);

  return { offers, pagination };
};
