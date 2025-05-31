import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const SelectLocation = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries();
    const argentina = countries.find((country) => country.isoCode === "AR");

    if (argentina) {
      const argentinaOption = {
        value: argentina.isoCode,
        label: argentina.name,
      };

      setCountryOptions([argentinaOption]);
      setSelectedCountry(argentinaOption);

      // Cargar provincias de Argentina automáticamente
      loadStates(argentina.isoCode);
    }
  }, []);

  // Función para cargar provincias/estados
  const loadStates = (countryCode) => {
    const states = State.getStatesOfCountry(countryCode);
    const stateOptions = states.map((state) => ({
      value: state.isoCode,
      label: state.name,
      countryCode: state.countryCode,
    }));

    setStateOptions(stateOptions);
    setSelectedState(null);
    setSelectedCity(null);
    setCityOptions([]);
  };

  // Función para cargar ciudades
  const loadCities = (countryCode, stateCode) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    const cityOptions = cities.map((city) => ({
      value: city.name,
      label: city.name,
    }));

    setCityOptions(cityOptions);
    setSelectedCity(null);
  };

  // Manejar cambio de provincia
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);

    if (selectedOption && selectedCountry) {
      loadCities(selectedCountry.value, selectedOption.value);
    } else {
      setCityOptions([]);
      setSelectedCity(null);
    }
  };

  // Manejar cambio de ciudad
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      pais: selectedCountry?.label,
      provincia: selectedState?.label,
      ciudad: selectedCity?.label,
    };

    console.log("Datos del formulario:", formData);
    alert(
      `Seleccionaste: ${formData.ciudad}, ${formData.provincia}, ${formData.pais}`
    );
  };

  // Estilos personalizados para react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: "#9ca3af",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#dbeafe"
        : "white",
      color: state.isSelected ? "white" : "#374151",
    }),
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País
          </label>
          <Select
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={countryOptions}
            isSearchable={false}
            isDisabled={true}
            placeholder="País"
            styles={customStyles}
          />
        </div>

        {/* Provincia */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provincia
          </label>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            options={stateOptions}
            isSearchable={true}
            placeholder="Selecciona una provincia"
            noOptionsMessage={() => "No hay provincias disponibles"}
            styles={customStyles}
          />
        </div>

        {/* Ciudad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad
          </label>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
            isSearchable={true}
            placeholder="Selecciona una ciudad"
            noOptionsMessage={() => "Primero selecciona una provincia"}
            isDisabled={!selectedState}
            styles={customStyles}
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          disabled={!selectedCity}
        >
          Enviar Formulario
        </button>
      </form>

      {/* Información seleccionada */}
      {selectedCity && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-gray-800 mb-2">
            Ubicación seleccionada:
          </h3>
          <p className="text-gray-600">
            <strong>País:</strong> {selectedCountry?.label}
            <br />
            <strong>Provincia:</strong> {selectedState?.label}
            <br />
            <strong>Ciudad:</strong> {selectedCity?.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectLocation;
