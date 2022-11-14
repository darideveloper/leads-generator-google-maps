import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export function SearchContextProvider({ children }) {
    const [keywords, setKeywords] = useState("");
    const [cities, setCities] = useState("");
    const [max, setMax] = useState("");
    const [reviews_note, setReviewsNote] = useState("");
    const [reviews_number, setReviewsNumber] = useState("");
    const [emails, setEmails] = useState("");
    const [save_emails, setSaveEmails] = useState(true);
    const [save_name, setSaveName] = useState(true);
    const [save_reviews, setSaveReviews] = useState(false);
    const [save_note, setSaveNotes] = useState(false);
    const [save_category, setSaveCategory] = useState(false);
    const [save_location, setSaveLocation] = useState(false);
    const [save_details, setSaveDetails] = useState(false);
    const [save_website, setSaveWebsite] = useState(true);
    
    return (
        <SearchContext.Provider
            value={{
                keywords,
                setKeywords,
                cities,
                setCities,
                max,
                setMax,
                reviews_note,
                setReviewsNote,
                reviews_number,
                setReviewsNumber,
                emails,
                setEmails,
                save_emails,
                setSaveEmails,
                save_name,
                setSaveName,
                save_reviews,
                setSaveReviews,
                save_note,
                setSaveNotes,
                save_category,
                setSaveCategory,
                save_location,
                setSaveLocation,
                save_details,
                setSaveDetails,
                save_website,
                setSaveWebsite,
            }}>
            {children}
        </SearchContext.Provider>
    )
}