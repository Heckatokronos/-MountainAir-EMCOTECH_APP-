import React, { useState } from 'react';
import axios from 'axios';

function ParserComponent() {
    // Состояния для URL, распарсенных данных, загрузки и ошибок
    const [url, setUrl] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функция для парсинга данных с указанного URL
    const handleParse = async () => {
        setLoading(true); // Начинаем загрузку
        setError(null); // Сбрасываем ошибки
        setParsedData(null); // Сбрасываем данные

        try {
            // Выполняем запрос и сохраняем данные
            const response = await axios.get(`http://localhost:5001/parse?url=${url}`);
            setParsedData(response.data);
        } catch (err) {
            // Обрабатываем ошибки
            setError(err.message || 'Произошла ошибка при парсинге');
        } finally {
            setLoading(false); // Завершаем загрузку
        }
    };

    return (
        <div>
            <h2>Парсинг данных с сайта</h2>
            <input
                type="text"
                placeholder="Введите URL сайта"
                value={url}
                onChange={(e) => setUrl(e.target.value)} // Обновляем URL
            />
            <button onClick={handleParse} disabled={loading}>
                {loading ? "Загрузка..." : "Парсить"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибки */}
            {parsedData && parsedData.pageTitle && (
                <div>
                    <h3>Заголовок страницы:</h3>
                    <p>{parsedData.pageTitle}</p> {/* Отображаем заголовок страницы */}
                </div>
            )}
        </div>
    );
}

export default ParserComponent; // Экспортируем компонент
