import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Yes } from "../api/yes/Yes";

type Props = { id: string };

export const YesTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Yes,
    AxiosError,
    [string, string]
  >(["get-/api/yeses", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/yeses"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/yeses"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
