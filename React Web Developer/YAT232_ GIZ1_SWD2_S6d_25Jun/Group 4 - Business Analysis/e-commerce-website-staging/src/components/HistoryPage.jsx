import React, { useEffect, useState } from "react";

//retriv stored login history mn localStorage & displays it in table.
const HistoryPage = () => {
    const [userHistory, setUserHistory] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('userHistory')) || [];
        setUserHistory(history);
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User Login History</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">User Email</th>
                        <th className="px-4 py-2 border">Action</th>
                        <th className="px-4 py-2 border">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {userHistory.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center py-2">No login history available</td>
                        </tr>
                    ) : (
                        userHistory.map((entry, index) => (
                            <tr key={index} className="text-center">
                                <td className="px-4 py-2 border">{entry.userEmail}</td>
                                <td className="px-4 py-2 border">{entry.action}</td>
                                <td className="px-4 py-2 border">{entry.date}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryPage;
