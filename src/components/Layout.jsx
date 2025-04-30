import React from 'react';

const Layout = ({ children }) => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Sistema de Facturación</h1>
            {children}
        </div>
    );
};

export default Layout;