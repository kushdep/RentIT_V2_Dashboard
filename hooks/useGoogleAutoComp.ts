import { useEffect, useRef, useState } from "react";
import { getSessionToken, getSuggestions, loadGoogleScript } from "@/utils/client-utils/googleAutoComp";

type predVal = { val: string, index: number|null }

export function useGoogleAutoComp() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [inpVal, setInpVal] = useState<predVal>({ val: "", index: -1 });
    const [sugg, setSugg] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);


    useEffect(() => {
        if (!window.google) {
            loadGoogleScript(setIsLoaded);
        } else {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (window.google) {
            if (!inpVal.val || inpVal.val.length < 4) {
                setSugg([]);
                return;
            }

            if (!sessionTokenRef.current) {
                const token = getSessionToken();
                if (!token) {
                    console.error("Cannot get token");
                    return;
                }
                sessionTokenRef.current = token;
            }

            async function sugg() {
                try {
                    const { suggestions  } = await getSuggestions(
                        sessionTokenRef.current!,
                        inpVal.val
                    );
                    console.log(suggestions)
                    setSugg(suggestions);
                } catch (error) {
                    console.error("Error while getting sugg()" + error);
                }
            }
            sugg();
        }
    }, [inpVal.val]);

    function handleInpVal(value:predVal){
        try {
            if (value.hasOwnProperty("val") && value.hasOwnProperty("index")) {
                setInpVal(value);
            } else {
                console.error("state value is incomplete");
            }
        } catch (error) {
            console.error("Error in handleInpVal "+error)
        }
    }

    return {
        inpVal,
        isLoaded,
        sugg,
        handleInpVal,
    }
}