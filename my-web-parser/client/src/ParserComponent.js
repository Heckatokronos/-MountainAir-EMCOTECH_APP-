import React, { useState } from 'react';
import axios from 'axios';

function ParserComponent() {
    const [url, setUrl] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleParse = async () => {
        setLoading(true);
        setError(null);
        setParsedData(null);
        try {
            const response = await axios.get(`http://localhost:5001/parse?url=${url}`);
            setParsedData(response.data);
        } catch (err) {
            setError(err.message || 'Произошла ошибка при парсинге');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Парсинг данных с сайта</h2>
            <input
                type="text"
                placeholder="Введите URL сайта"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleParse} disabled={loading}>
                {loading ? "Загрузка..." : "Парсить"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {parsedData && parsedData.pageTitle && (
                <div>
                    <h3>Заголовок страницы:</h3>
                    <p>{parsedData.pageTitle}</p>
                </div>
            )}
        </div>
    );
}

export default ParserComponent;