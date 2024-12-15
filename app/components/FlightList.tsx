import React, { useEffect, useState } from 'react';
import { css } from '../../styled-system/css'
import { useTranslation } from 'react-i18next'
import ContentLoader from './ContentLoader'
import Link from './Link'
import { useLocation, useNavigate } from 'react-router-dom';

interface Flight {
    id: string;
    title: string;
    summary: string;
    image_url: string;
    published_at: string;
    news_site: string;
    url: string;
}

const FlightList: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'alphabetical' | 'chronological'>('chronological');
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sortParam = params.get('sort');
        const searchParam = params.get('search');
        if (sortParam) {
            setSortOrder(sortParam as 'alphabetical' | 'chronological');
        }
        if (searchParam) {
            setSearchTerm(searchParam);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const cachedData = localStorage.getItem('flights');
            const cachedTime = localStorage.getItem('flights_timestamp');
            const twelveDaysInMs = 1036800000; // 12 days in ms

            if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < twelveDaysInMs)) {
                try {
                    setFlights(JSON.parse(cachedData));
                } catch (error) {
                    console.error("Failed to parse cached flights data:", error);
                    localStorage.removeItem('flights');
                    localStorage.removeItem('flights_timestamp');
                }
            } else {
                const response = await fetch('/api/articles');
                const data = await response.json();
                setFlights(data.articles.results);
                localStorage.setItem('flights', JSON.stringify(data.results));
                localStorage.setItem('flights_timestamp', String(Date.now()));
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredFlights = flights.filter(flight =>
        flight.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFlights = [...filteredFlights].sort((a, b) => {
        if (sortOrder === 'alphabetical') {
            return a.title.localeCompare(b.title);
        } 

        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOrder = e.target.value as 'alphabetical' | 'chronological';
        setSortOrder(newSortOrder);
        const params = new URLSearchParams(location.search);
        params.set('sort', newSortOrder);
        navigate({ search: params.toString() });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        const params = new URLSearchParams(location.search);
        params.set('search', newSearchTerm);
        navigate({ search: params.toString() });
    };

    return (
        <section>
            <div className={css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: '10px', fontWeight: 'semibold', gap: '10px' })}>
                <input
                    className={css({ border: '1px solid #e0e0e0', borderRadius: '10px', p: '10px', w: '100%' })}
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select onChange={handleSortChange}>
                    <option value="chronological">{t('chronological')}</option>
                    <option value="alphabetical">{t('alphabetical')}</option>
                </select>
            </div>

            <div className={css({ display: 'flex', flexDirection: 'column', gap: '9px', p: '10px', border: '1px solid #e0e0e0', borderRadius: '10px', w: 'full' })}>
                {loading ? (
                    [...Array(6)].map((_, index) => (
                        <ContentLoader key={index} />
                    ))
                ) : (
                    sortedFlights.length === 0 ? (
                        <div className={css({ textAlign: 'center', fontSize: 'lg', color: 'gray.500' })}>
                            {t('notFound')}
                        </div>
                    ) : (
                        sortedFlights.map(flight => (
                            <article key={flight.id} className={css({ display: 'flex', flexDirection: 'column', gap: '9px', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '10px', width: '100%', bg: '#f9f9f9' })}>
                                <div className={css({ position: 'relative' })}>
                                    <a
                                        aria-hidden="true"
                                        className={css({
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            w: '100%',
                                            h: '100%',
                                            rounded: '10px',
                                            transition: 'background-color 0.3s ease',
                                            opacity: '10%',
                                            '&:hover': {
                                                backgroundColor: '#ED8F27'
                                            }
                                        })}
                                        href={flight.url}
                                        rel="noopener noreferrer">
                                    </a>
                                    <img className={css({ w: '100%', h: 'auto', objectFit: 'cover', aspectRatio: '16/9', borderRadius: '10px', bg: '#deefff' })} src={flight.image_url} alt={flight.title} />
                                </div>
                                <h3 className={css({ fontSize: '1.2rem', fontWeight: 'bold' })}>{flight.title}</h3>
                                <p className={css({ color: 'gray.500' })}>{flight.summary}</p>
                                <p className={css({ fontSize: '0.7rem', color: '#808080', pb: '10px' })}>
                                    {t('source')}: {flight.news_site} | {t('publishedAt')} <time dateTime={flight.published_at}>{new Date(flight.published_at).toLocaleDateString()}</time>
                                </p>
                                <Link className={css({ display: 'flex', justifyContent: 'flex-end', w: 'full' })} to={flight.url}>{t('readArticle')}</Link>
                            </article>
                        ))
                    )
                )}
            </div>
        </section>
    );
};

export default FlightList;
