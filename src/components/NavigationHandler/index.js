// src/components/NavigationHandler.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationHandler = () => {
    const currentPage = useSelector((state) => state.page.currentPage);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(currentPage);
    }, [currentPage, navigate]);

    return null;
};

export default NavigationHandler;