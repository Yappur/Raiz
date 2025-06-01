import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import arrowDown from "../../assets/icons/arrowDown.svg";

const SelectLocation = ({
  value,
  onChange,
  error,
  placeholder = "Busca tu ciudad...",
}) => {
  const [todasLasUbicaciones, setTodasLasUbicaciones] = useState([]);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);

  useEffect(() => {
    const cargarUbicaciones = () => {
      const argentina = Country.getCountryByCode("AR");
      if (argentina) {
        const estadosArgentina = State.getStatesOfCountry("AR");
        const ubicaciones = [];

        estadosArgentina.forEach((estado) => {
          const ciudadesEstado = City.getCitiesOfState("AR", estado.isoCode);

          ciudadesEstado.forEach((ciudad) => {
            ubicaciones.push({
              value: `${ciudad.name}, ${estado.name}`,
              label: `${ciudad.name}, ${estado.name}`,
              ciudad: ciudad.name,
              provincia: estado.name,
              searchText: `${ciudad.name} ${estado.name}`.toLowerCase(),
            });
          });

          ubicaciones.push({
            value: estado.name,
            label: estado.name,
            ciudad: "",
            provincia: estado.name,
            searchText: estado.name.toLowerCase(),
            esSoloProvincia: true,
          });
        });

        ubicaciones.sort((a, b) => a.label.localeCompare(b.label));

        setTodasLasUbicaciones(ubicaciones);
      }
    };

    cargarUbicaciones();
  }, []);

  const handleUbicacionChange = (ubicacionSeleccionada) => {
    setUbicacionSeleccionada(ubicacionSeleccionada);

    if (ubicacionSeleccionada) {
      onChange(ubicacionSeleccionada.value);
    } else {
      onChange("");
    }
  };

  useEffect(() => {
    if (value && todasLasUbicaciones.length > 0) {
      const ubicacionEncontrada = todasLasUbicaciones.find(
        (u) => u.value === value
      );
      setUbicacionSeleccionada(ubicacionEncontrada || null);
    } else if (!value) {
      setUbicacionSeleccionada(null);
    }
  }, [value, todasLasUbicaciones]);

  const filterOption = (option, inputValue) => {
    if (!inputValue) return true;
    const searchValue = inputValue.toLowerCase();
    return option.data.searchText.includes(searchValue);
  };

  const DropdownIndicator = () => (
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <img src={arrowDown} className="w-5 h-5" />
    </div>
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: error ? "#ef4444" : state.isFocused ? "#fb923c" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(251, 146, 60, 0.4)" : "none",
      borderWidth: "1px",
      borderRadius: "0.375rem",
      padding: "3px 0",
      minHeight: "38px",
      fontSize: "14px",
      "&:hover": {
        borderColor: error ? "#ef4444" : "d1d5db",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#f3f4f6",
      color: "#374151",
      cursor: "pointer",
      fontSize: "14px",
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "12px",
      paddingRight: "12px",
      fontWeight: state.data.esSoloProvincia ? "600" : "400",
      borderBottom: state.data.esSoloProvincia ? "1px solid #e5e7eb" : "none",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginTop: "4px",
      zIndex: 10,
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: "160px",
      paddingTop: "0",
      paddingBottom: "0",
      overflowY: "auto",
    }),
  };
  return (
    <div>
      <Select
        value={ubicacionSeleccionada}
        onChange={handleUbicacionChange}
        options={todasLasUbicaciones}
        styles={customStyles}
        placeholder={placeholder}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        isClearable
        isSearchable
        filterOption={filterOption}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `No se encontraron ubicaciones para "${inputValue}"`
            : "Escribe para buscar ubicaciones"
        }
        loadingMessage={() => "Cargando ubicaciones..."}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectLocation;
