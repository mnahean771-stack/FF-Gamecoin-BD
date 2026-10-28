import React from 'react';
import { PRODUCTS } from '../config/siteConfig';
import { useApp } from '../context/AppContext';

export const ProductGrid: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="mt-[34px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[5px] h-[28px] rounded-[5px] bg-linear-to-b from-blue-300 to-blue-600" />
        <h2 className="text-[21px] font-extrabold tracking-tight">
          <span className="bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            GAME TOPUP &amp; OFFERS
          </span>
        </h2>
        <div className="flex-1 h-[1px] bg-linear-to-r from-[#e1e8f5] to-transparent" />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {PRODUCTS.map((prod) => (
          <button
            key={prod.id}
            onClick={() => navigateTo('product', prod.id)}
            className="group relative rounded-[20px] overflow-hidden bg-white border-[1.8px] border-[#111827] shadow-[0_5px_0_#111827,0_10px_20px_-3px_rgba(17,24,39,0.26)] hover:-translate-y-1 hover:shadow-[0_8px_0_#111827,0_18px_28px_-4px_rgba(17,24,39,0.36)] active:translate-y-[3px] active:shadow-[0_2px_0_#111827,0_6px_12px_rgba(17,24,39,0.25)] transition-all duration-200 text-left flex flex-col cursor-pointer"
          >
            <div className="aspect-square w-full relative bg-[#e8f0fe] overflow-hidden">
              <img
                src={prod.image}
                alt={prod.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="flex items-center justify-center min-h-[50px] p-2 text-[11.5px] font-bold text-[#111827] text-center uppercase tracking-wide leading-tight">
              {prod.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};
