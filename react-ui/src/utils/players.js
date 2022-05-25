import {useState, useEffect} from 'react';
import useFetch from 'react-fetch-hook'
import React from 'react';

export default function GetPlayers(){
    const {isLoading, error, data} = useFetch("/api/players");
    if (isLoading)
        return "loading...";
    if (error){
        console.log('error fetching data',error);
        throw error;
    }
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
}