import { Button } from "@mui/material";
import React from "react";

export default function CustomTabs({ items, hanldeCallback = () => { } }) {

    const [activeTab, setActiveTab] = useState('1');

    const handleTab = (key) => {
        setActiveTab(key);
        hanldeCallback(key);
    }

    return (
        <>
            <Box>
                {items.map(() => {
                    return (
                        <Button
                            onClick={() => handleTab}
                        >
                            {items.label}
                        </Button>
                    );
                })}
            </Box>
        </>
    );
}