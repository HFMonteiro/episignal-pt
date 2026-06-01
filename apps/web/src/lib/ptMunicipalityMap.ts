export type MunicipalityMapShape = {
  municipality_id: string;
  municipality: string;
  district: string;
  districtDisplay: string;
  district_id: string;
  path: string;
};

export const portugalMunicipalityMapMeta = {
  source: "DGT CAOP2025 Continente",
  sourceUrl: "https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop?language=pt",
  downloadUrl: "https://geo2.dgterritorio.gov.pt/caop/CAOP_Continente_2025-gpkg.zip",
  layer: "cont_municipios",
  simplificationMeters: 1800,
  viewBox: "0 0 379.499 547.489"
};

export const portugalMunicipalityShapes: MunicipalityMapShape[] = [
  {
    "municipality_id": "0102",
    "municipality": "Albergaria-a-Velha",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M138.08 162.93 L129.26 150.84 L136.89 154.43 L138.97 151.9 L137.62 146.64 L145.14 144.98 L147.21 146.42 L146.59 154.32 L142.19 155.56 L141.03 161.8 L138.08 162.93 Z"
  },
  {
    "municipality_id": "0103",
    "municipality": "Anadia",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M152.09 183.98 L145.18 185.53 L139.37 182.68 L133.91 184.97 L133.66 178.09 L141.94 173.74 L153.19 173.36 L154.47 180.72 L152.09 183.98 Z"
  },
  {
    "municipality_id": "0104",
    "municipality": "Arouca",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M155.54 134.96 L145.44 128.53 L148.87 121.61 L154.35 125.47 L160.74 125.62 L161.93 120.12 L168.55 124.05 L172.7 120.84 L169.38 127.28 L171.47 137.07 L161.46 136.06 L157.59 138.15 L155.54 134.96 Z"
  },
  {
    "municipality_id": "0105",
    "municipality": "Aveiro",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M138.04 163.59 L132.04 171.43 L130.31 165.24 L123.38 157.59 L118.68 159.25 L121.03 152.56 L129.26 150.84 L138.04 163.59 Z"
  },
  {
    "municipality_id": "0106",
    "municipality": "Castelo de Paiva",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M161.04 121.19 L160.74 125.62 L154.35 125.47 L149.27 121.38 L148.13 116.23 L152.23 117.48 L156.87 113.35 L161.03 115.7 L161.04 121.19 Z"
  },
  {
    "municipality_id": "0107",
    "municipality": "Espinho",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M131.07 123.73 L127.75 125.38 L128.38 119.98 L131.57 118.97 L131.07 123.73 Z"
  },
  {
    "municipality_id": "0108",
    "municipality": "Estarreja",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M136.88 154.42 L129.9 150.48 L129.57 146.96 L132.4 145.84 L126.7 143.52 L128.53 141.13 L137.93 139.47 L135.98 143.67 L138.64 145.35 L138.97 151.9 L136.88 154.42 Z"
  },
  {
    "municipality_id": "0111",
    "municipality": "Mealhada",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M143.89 195.12 L143.38 197.78 L137.66 196.4 L137.3 193.91 L140.92 193.96 L139.33 183.32 L151.51 185.53 L151.2 190.61 L147.38 190.11 L143.89 195.12 Z"
  },
  {
    "municipality_id": "0112",
    "municipality": "Murtosa",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M129.5 148.11 L130.57 150.2 L121.03 152.56 L124.22 141.03 L131.94 145.19 L129.5 148.11 Z"
  },
  {
    "municipality_id": "0113",
    "municipality": "Oliveira de Azeméis",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M147.29 145.5 L139.21 147.16 L135.98 143.67 L138.1 133.27 L141.5 134.4 L145.12 128.35 L149.17 131.79 L146.0 135.75 L148.1 141.03 L145.16 142.79 L147.29 145.5 Z"
  },
  {
    "municipality_id": "0114",
    "municipality": "Oliveira do Bairro",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M130.28 176.1 L129.85 170.64 L133.58 170.67 L134.53 167.73 L139.49 168.2 L142.83 172.49 L134.32 177.99 L130.28 176.1 Z"
  },
  {
    "municipality_id": "0115",
    "municipality": "Ovar",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M136.08 137.39 L136.4 139.93 L126.52 143.21 L126.61 140.69 L124.22 141.03 L127.75 125.38 L131.77 124.57 L134.22 134.93 L138.1 133.27 L136.08 137.39 Z"
  },
  {
    "municipality_id": "0109",
    "municipality": "Santa Maria da Feira",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M136.85 134.15 L133.02 133.34 L131.8 120.61 L137.76 117.44 L140.74 120.5 L142.69 118.55 L141.14 116.17 L144.13 116.1 L148.79 121.92 L142.47 131.78 L140.85 130.53 L136.85 134.15 Z"
  },
  {
    "municipality_id": "0117",
    "municipality": "Sever do Vouga",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M155.64 154.14 L156.5 158.41 L153.62 160.09 L149.68 154.03 L146.59 154.39 L148.36 142.94 L157.14 144.49 L158.12 147.45 L153.25 149.52 L155.64 154.14 Z"
  },
  {
    "municipality_id": "0116",
    "municipality": "São João da Madeira",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M142.08 133.0 L141.17 134.52 L139.0 133.02 L140.85 130.53 L142.08 133.0 Z"
  },
  {
    "municipality_id": "0118",
    "municipality": "Vagos",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M126.76 182.0 L116.94 172.19 L118.43 165.6 L131.08 166.99 L129.11 181.65 L126.76 182.0 Z"
  },
  {
    "municipality_id": "0119",
    "municipality": "Vale de Cambra",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M154.07 144.36 L145.16 142.79 L147.81 142.64 L146.0 135.75 L149.14 131.93 L161.03 139.98 L158.11 146.75 L154.07 144.36 Z"
  },
  {
    "municipality_id": "0101",
    "municipality": "Águeda",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M144.97 173.69 L139.49 168.2 L135.14 167.85 L141.03 161.8 L142.19 155.56 L149.66 154.02 L151.11 158.64 L156.32 158.21 L160.31 162.25 L155.24 164.35 L159.92 173.36 L144.97 173.69 Z"
  },
  {
    "municipality_id": "0110",
    "municipality": "Ílhavo",
    "district": "Aveiro",
    "districtDisplay": "Aveiro",
    "district_id": "01",
    "path": "M121.52 166.14 L118.43 165.6 L119.11 159.37 L122.48 157.53 L130.33 165.36 L125.59 167.81 L121.52 166.14 Z"
  },
  {
    "municipality_id": "0201",
    "municipality": "Aljustrel",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M166.64 441.3 L175.42 438.65 L173.51 450.35 L176.44 457.4 L168.93 461.39 L166.75 458.73 L165.61 460.81 L163.29 458.64 L156.05 460.54 L152.36 452.46 L155.45 448.82 L155.94 438.89 L166.64 441.3 Z"
  },
  {
    "municipality_id": "0202",
    "municipality": "Almodôvar",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M168.06 482.31 L168.83 477.15 L172.19 477.08 L180.58 479.38 L181.37 484.45 L188.19 481.69 L190.03 483.95 L186.19 485.93 L188.79 488.86 L186.47 491.22 L188.91 492.02 L187.0 494.13 L189.91 499.85 L180.55 501.65 L181.36 505.31 L175.01 510.0 L157.35 502.8 L163.01 495.9 L158.27 484.55 L166.6 480.13 L168.06 482.31 Z"
  },
  {
    "municipality_id": "0203",
    "municipality": "Alvito",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M180.54 420.31 L172.38 422.32 L166.95 403.7 L184.79 406.03 L185.91 409.9 L183.57 411.46 L186.32 416.48 L180.54 420.31 Z"
  },
  {
    "municipality_id": "0204",
    "municipality": "Barrancos",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M250.23 424.39 L246.15 423.05 L250.53 423.02 L253.49 418.09 L256.63 419.86 L268.94 414.35 L265.78 426.61 L255.28 428.37 L250.23 424.39 Z"
  },
  {
    "municipality_id": "0205",
    "municipality": "Beja",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M195.69 455.21 L189.62 456.81 L186.62 461.75 L183.62 457.95 L181.49 459.74 L178.27 456.4 L176.73 457.76 L173.51 450.35 L176.43 442.8 L174.78 438.42 L180.45 425.43 L183.56 427.03 L190.11 425.02 L193.89 421.01 L196.85 431.04 L203.12 425.41 L211.05 431.38 L206.98 444.4 L210.52 448.07 L210.07 456.93 L206.27 455.82 L201.62 459.89 L199.47 454.6 L195.69 455.21 Z"
  },
  {
    "municipality_id": "0206",
    "municipality": "Castro Verde",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M188.0 481.79 L181.37 484.45 L178.54 478.22 L167.37 476.68 L164.04 466.91 L159.89 465.41 L165.29 459.42 L170.08 461.19 L178.27 456.4 L180.27 459.45 L183.62 457.95 L186.62 461.75 L188.32 460.33 L191.72 463.25 L189.96 468.01 L193.15 473.91 L188.86 474.4 L190.74 477.81 L186.03 476.1 L188.0 481.79 Z"
  },
  {
    "municipality_id": "0207",
    "municipality": "Cuba",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M182.98 426.61 L180.17 423.31 L186.51 415.8 L183.57 411.46 L185.91 409.9 L185.1 405.99 L193.16 410.95 L190.32 415.37 L193.98 418.92 L193.82 422.67 L182.98 426.61 Z"
  },
  {
    "municipality_id": "0208",
    "municipality": "Ferreira do Alentejo",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M159.1 439.22 L155.47 438.73 L153.83 435.42 L150.09 435.86 L146.29 430.53 L152.64 421.81 L156.18 423.56 L156.75 418.51 L160.45 419.27 L169.64 414.57 L172.38 422.32 L179.61 420.09 L182.33 421.67 L177.01 437.31 L168.74 441.92 L159.1 439.22 Z"
  },
  {
    "municipality_id": "0210",
    "municipality": "Moura",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M248.13 437.65 L240.71 441.9 L237.93 437.64 L233.98 437.46 L231.62 432.46 L226.34 430.81 L227.03 429.02 L219.36 427.83 L222.25 416.35 L229.51 409.78 L229.7 406.48 L240.17 403.06 L243.24 410.1 L247.75 411.81 L251.02 421.46 L246.16 423.07 L255.28 428.37 L264.67 426.3 L263.69 435.26 L259.96 436.17 L255.6 433.1 L253.8 437.25 L248.13 437.65 Z"
  },
  {
    "municipality_id": "0209",
    "municipality": "Mértola",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M189.6 497.75 L186.19 485.93 L190.03 483.95 L186.02 476.14 L190.74 477.81 L188.86 474.4 L193.15 473.91 L189.96 468.01 L191.72 463.25 L187.13 459.78 L189.57 456.85 L197.94 454.05 L201.64 459.89 L208.71 456.1 L211.16 457.99 L210.67 464.87 L220.64 461.7 L228.31 465.14 L221.34 488.09 L216.25 487.71 L212.39 491.88 L204.63 490.65 L189.6 497.75 Z"
  },
  {
    "municipality_id": "0211",
    "municipality": "Odemira",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M131.68 500.73 L126.35 503.87 L124.68 501.26 L118.83 501.81 L117.5 497.93 L113.15 496.5 L113.39 459.56 L114.15 457.03 L118.94 457.57 L123.05 463.96 L128.8 464.5 L131.33 463.75 L134.37 454.21 L144.13 451.77 L146.95 452.65 L149.15 462.54 L141.39 469.02 L152.13 471.84 L154.34 483.25 L147.52 489.18 L148.75 498.56 L145.34 499.42 L144.34 503.17 L137.2 503.64 L131.68 500.73 Z"
  },
  {
    "municipality_id": "0212",
    "municipality": "Ourique",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M149.75 486.44 L154.34 483.25 L152.65 472.92 L141.39 469.01 L149.15 462.54 L146.95 452.65 L152.81 454.31 L156.05 460.54 L164.27 459.48 L164.83 462.0 L159.84 466.71 L164.04 466.91 L168.99 477.71 L168.24 482.61 L166.6 480.13 L158.27 484.55 L163.01 495.9 L159.09 500.25 L153.83 497.29 L148.75 498.56 L146.67 493.86 L149.75 486.44 Z"
  },
  {
    "municipality_id": "0213",
    "municipality": "Serpa",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M235.12 437.99 L243.21 442.58 L236.99 457.32 L228.98 465.07 L220.64 461.7 L210.67 464.87 L210.53 448.11 L206.98 444.4 L210.33 438.8 L209.47 427.13 L213.49 420.74 L219.91 421.6 L219.71 428.33 L227.03 429.02 L226.34 430.81 L231.62 432.46 L235.12 437.99 Z"
  },
  {
    "municipality_id": "0214",
    "municipality": "Vidigueira",
    "district": "Beja",
    "districtDisplay": "Beja",
    "district_id": "02",
    "path": "M209.32 429.19 L203.12 425.41 L196.85 431.04 L195.44 421.49 L190.32 415.37 L193.16 410.95 L207.9 416.99 L222.72 417.97 L221.58 421.43 L213.56 420.67 L209.32 429.19 Z"
  },
  {
    "municipality_id": "0301",
    "municipality": "Amares",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M147.56 57.39 L145.52 57.94 L150.44 49.09 L158.36 47.94 L160.38 52.96 L147.56 57.39 Z"
  },
  {
    "municipality_id": "0302",
    "municipality": "Barcelos",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M128.21 76.98 L120.71 72.26 L124.29 69.27 L121.81 66.02 L121.89 56.04 L128.71 54.91 L128.97 52.63 L137.07 55.11 L140.69 64.44 L139.14 71.33 L135.15 72.04 L135.42 76.35 L128.21 76.98 Z"
  },
  {
    "municipality_id": "0303",
    "municipality": "Braga",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M143.54 72.46 L138.36 70.18 L139.49 62.07 L144.59 58.03 L152.97 56.68 L156.29 63.61 L149.9 65.59 L148.61 70.05 L143.54 72.46 Z"
  },
  {
    "municipality_id": "0304",
    "municipality": "Cabeceiras de Basto",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M180.56 73.03 L174.62 70.29 L175.73 60.02 L179.69 56.71 L187.46 59.85 L192.58 57.29 L194.88 61.25 L190.89 67.76 L185.66 70.33 L184.77 74.61 L180.56 73.03 Z"
  },
  {
    "municipality_id": "0305",
    "municipality": "Celorico de Basto",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M175.7 86.69 L168.26 83.72 L174.64 70.31 L184.91 74.85 L180.82 85.15 L177.69 88.1 L175.7 86.69 Z"
  },
  {
    "municipality_id": "0306",
    "municipality": "Esposende",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M121.42 70.43 L118.29 71.81 L115.61 57.06 L120.64 55.68 L124.32 68.77 L121.42 70.43 Z"
  },
  {
    "municipality_id": "0307",
    "municipality": "Fafe",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M164.98 78.55 L160.22 78.0 L162.33 77.33 L161.75 65.03 L174.12 62.16 L175.46 68.94 L170.64 82.05 L164.98 78.55 Z"
  },
  {
    "municipality_id": "0308",
    "municipality": "Guimarães",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M151.68 83.13 L148.52 83.44 L149.96 77.25 L145.32 72.87 L150.21 65.39 L159.14 64.68 L160.56 67.07 L161.75 63.36 L164.36 61.73 L161.22 67.21 L162.33 77.33 L160.22 78.0 L162.26 80.27 L158.53 81.47 L155.15 79.05 L154.84 82.38 L151.68 83.13 Z"
  },
  {
    "municipality_id": "0309",
    "municipality": "Póvoa de Lanhoso",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M158.31 65.61 L156.53 66.37 L156.38 62.43 L152.61 59.49 L154.98 53.71 L159.18 52.58 L160.37 55.53 L164.92 56.64 L163.54 58.51 L167.99 59.79 L168.24 63.92 L165.32 64.32 L164.36 61.73 L160.56 67.07 L158.31 65.61 Z"
  },
  {
    "municipality_id": "0310",
    "municipality": "Terras de Bouro",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M152.24 48.05 L155.6 45.71 L156.6 39.39 L166.82 35.48 L175.89 35.44 L172.88 46.6 L164.78 52.53 L160.38 52.96 L158.34 47.92 L153.97 50.08 L152.24 48.05 Z"
  },
  {
    "municipality_id": "0311",
    "municipality": "Vieira do Minho",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M169.93 63.78 L159.34 52.79 L176.85 47.86 L180.72 49.52 L179.81 56.77 L174.96 62.95 L169.93 63.78 Z"
  },
  {
    "municipality_id": "0312",
    "municipality": "Vila Nova de Famalicão",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M141.81 82.66 L131.37 85.7 L130.38 81.3 L132.99 79.49 L130.46 77.87 L135.42 76.35 L135.15 72.04 L144.23 71.85 L149.9 77.09 L149.81 81.44 L141.81 82.66 Z"
  },
  {
    "municipality_id": "0313",
    "municipality": "Vila Verde",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M142.13 59.5 L140.29 61.71 L136.6 58.39 L138.89 45.1 L150.24 40.48 L155.5 41.48 L155.6 45.71 L142.13 59.5 Z"
  },
  {
    "municipality_id": "0314",
    "municipality": "Vizela",
    "district": "Braga",
    "districtDisplay": "Braga",
    "district_id": "03",
    "path": "M157.5 85.41 L153.88 83.33 L155.15 79.05 L160.29 80.45 L157.5 85.41 Z"
  },
  {
    "municipality_id": "0401",
    "municipality": "Alfândega da Fé",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M266.7 94.83 L262.21 95.13 L253.94 88.66 L256.8 82.12 L254.41 77.72 L258.59 76.95 L263.47 71.38 L270.73 78.45 L268.82 83.02 L273.7 84.59 L266.7 94.83 Z"
  },
  {
    "municipality_id": "0402",
    "municipality": "Bragança",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M278.38 62.16 L274.62 58.13 L266.61 59.1 L266.24 52.88 L269.91 45.58 L264.41 44.25 L262.96 40.79 L266.1 36.79 L262.35 34.09 L267.78 29.84 L266.66 23.65 L272.65 21.19 L273.38 16.27 L282.25 22.38 L291.26 18.73 L294.33 21.52 L292.49 27.46 L296.91 28.62 L293.26 50.7 L287.12 50.66 L285.01 64.21 L278.38 62.16 Z"
  },
  {
    "municipality_id": "0403",
    "municipality": "Carrazeda de Ansiães",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M231.98 106.16 L225.2 99.33 L225.88 96.27 L228.72 95.74 L231.07 86.59 L237.25 86.1 L235.77 89.99 L240.58 90.59 L240.88 96.66 L243.96 96.82 L244.72 101.05 L241.87 107.02 L231.98 106.16 Z"
  },
  {
    "municipality_id": "0404",
    "municipality": "Freixo de Espada à Cinta",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M265.09 118.04 L260.3 118.37 L262.4 114.71 L260.49 110.26 L268.35 109.85 L274.89 105.8 L274.28 100.96 L280.5 94.67 L284.42 99.75 L278.17 106.83 L277.29 113.86 L273.14 118.01 L265.09 118.04 Z"
  },
  {
    "municipality_id": "0405",
    "municipality": "Macedo de Cavaleiros",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M263.39 71.4 L258.59 76.95 L255.0 77.54 L256.95 72.35 L253.66 67.95 L256.23 60.13 L251.82 58.71 L248.72 49.88 L250.15 46.27 L256.03 50.43 L259.47 47.2 L264.64 49.41 L268.12 47.49 L266.61 59.1 L274.62 58.13 L281.08 64.38 L285.1 64.29 L286.31 69.07 L284.37 73.89 L275.1 78.26 L274.45 75.84 L270.73 78.45 L263.39 71.4 Z"
  },
  {
    "municipality_id": "0406",
    "municipality": "Miranda do Douro",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M312.56 79.71 L307.98 79.72 L308.94 82.47 L305.56 84.2 L296.39 73.24 L300.01 71.33 L298.87 66.59 L301.38 62.43 L305.5 68.07 L309.39 66.52 L305.72 62.23 L308.75 56.33 L307.89 49.59 L310.02 48.98 L323.35 59.41 L312.56 79.71 Z"
  },
  {
    "municipality_id": "0407",
    "municipality": "Mirandela",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M234.4 85.69 L230.66 83.03 L230.29 75.05 L235.59 72.46 L236.67 67.06 L241.02 66.26 L238.59 59.04 L243.98 43.81 L248.74 46.88 L252.46 59.59 L256.23 60.13 L253.65 67.97 L256.82 75.0 L249.46 78.32 L248.11 81.93 L243.41 80.39 L234.4 85.69 Z"
  },
  {
    "municipality_id": "0408",
    "municipality": "Mogadouro",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M287.49 94.78 L284.28 99.21 L279.95 94.88 L274.67 100.58 L271.35 97.14 L266.56 97.16 L273.27 86.76 L273.28 84.12 L268.82 83.02 L270.82 78.23 L287.75 71.59 L297.48 74.08 L305.73 86.03 L295.0 94.91 L287.49 94.78 Z"
  },
  {
    "municipality_id": "0409",
    "municipality": "Torre de Moncorvo",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M252.89 107.55 L249.33 106.81 L250.25 102.4 L246.67 108.05 L241.88 106.9 L244.06 96.93 L247.69 94.13 L251.85 96.57 L253.97 88.65 L262.21 95.13 L271.35 97.14 L275.78 104.65 L268.35 109.85 L260.76 109.91 L262.4 114.71 L260.28 117.71 L251.65 112.8 L252.89 107.55 Z"
  },
  {
    "municipality_id": "0410",
    "municipality": "Vila Flor",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M245.56 95.15 L241.08 97.07 L240.58 90.59 L235.77 89.99 L237.93 86.34 L235.94 86.03 L243.41 80.39 L248.11 81.93 L249.52 78.28 L254.41 77.72 L256.8 82.12 L251.99 96.39 L245.56 95.15 Z"
  },
  {
    "municipality_id": "0411",
    "municipality": "Vimioso",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M301.1 62.76 L299.53 72.06 L285.36 72.76 L284.63 60.9 L287.25 50.5 L292.54 51.42 L294.23 47.5 L298.59 51.24 L302.85 48.24 L308.15 49.23 L308.75 56.33 L305.72 62.27 L309.4 66.51 L305.5 68.07 L301.1 62.76 Z"
  },
  {
    "municipality_id": "0412",
    "municipality": "Vinhais",
    "district": "Braganca",
    "districtDisplay": "Bragança",
    "district_id": "04",
    "path": "M254.47 47.92 L249.11 47.69 L243.98 43.81 L245.35 40.29 L241.9 34.13 L244.96 24.4 L243.96 18.79 L247.4 16.81 L252.92 21.08 L260.18 18.44 L267.63 21.86 L266.85 32.49 L262.35 34.09 L266.1 36.79 L262.96 40.79 L264.41 44.25 L269.91 45.58 L264.64 49.41 L259.93 47.11 L256.03 50.43 L254.47 47.92 Z"
  },
  {
    "municipality_id": "0501",
    "municipality": "Belmonte",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M234.04 196.02 L235.77 200.06 L230.15 200.17 L229.07 190.82 L237.09 183.06 L238.54 191.14 L234.04 196.02 Z"
  },
  {
    "municipality_id": "0502",
    "municipality": "Castelo Branco",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M221.29 255.12 L212.53 254.22 L211.08 248.76 L201.94 255.63 L198.09 240.91 L192.29 241.28 L193.72 238.56 L200.99 240.76 L201.12 235.42 L204.81 234.18 L203.7 224.18 L209.29 218.73 L219.12 218.7 L222.26 227.58 L228.91 224.99 L236.09 237.99 L232.97 244.86 L246.91 248.55 L240.72 262.2 L234.73 264.85 L219.58 262.36 L221.29 255.12 Z"
  },
  {
    "municipality_id": "0503",
    "municipality": "Covilhã",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M204.78 212.45 L200.34 213.45 L196.43 210.05 L198.03 202.64 L207.89 198.31 L211.67 193.02 L217.45 193.59 L221.44 185.44 L232.4 185.85 L229.07 190.82 L231.18 202.12 L214.04 207.3 L213.39 211.21 L207.94 209.94 L204.78 212.45 Z"
  },
  {
    "municipality_id": "0504",
    "municipality": "Fundão",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M221.5 226.64 L219.11 218.7 L209.29 218.73 L200.63 225.92 L196.04 224.32 L194.94 219.12 L197.35 218.15 L197.06 218.74 L198.5 220.46 L201.24 212.87 L206.53 212.67 L207.94 209.94 L213.39 211.21 L214.04 207.3 L238.26 198.39 L240.61 205.7 L232.3 229.23 L228.91 224.99 L221.5 226.64 Z"
  },
  {
    "municipality_id": "0505",
    "municipality": "Idanha-a-Nova",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M233.4 245.28 L236.09 238.0 L232.26 224.87 L238.24 218.51 L243.55 221.71 L246.82 217.11 L253.43 219.58 L266.29 216.02 L269.91 220.22 L272.29 225.28 L269.33 239.99 L262.55 246.72 L260.43 261.47 L240.72 262.2 L246.85 248.33 L233.4 245.28 Z"
  },
  {
    "municipality_id": "0506",
    "municipality": "Oleiros",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M192.29 241.11 L191.7 244.99 L186.64 246.96 L186.99 242.55 L176.89 237.45 L173.12 230.96 L177.42 231.45 L179.03 228.4 L183.18 229.64 L191.38 221.02 L200.51 225.92 L203.7 224.18 L204.81 234.18 L201.12 235.42 L201.01 240.73 L193.72 238.56 L192.29 241.11 Z"
  },
  {
    "municipality_id": "0507",
    "municipality": "Penamacor",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M246.05 218.1 L243.56 221.71 L239.98 217.66 L235.31 221.35 L240.61 205.7 L238.83 198.91 L241.5 199.65 L243.7 196.72 L247.87 198.5 L251.79 192.56 L254.14 197.41 L259.54 196.08 L264.0 198.39 L258.59 207.32 L260.04 213.4 L265.88 214.75 L266.61 216.15 L253.43 219.58 L250.84 217.22 L246.05 218.1 Z"
  },
  {
    "municipality_id": "0508",
    "municipality": "Proença-a-Nova",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M197.59 262.38 L195.8 273.03 L191.25 265.41 L187.13 262.22 L183.64 262.98 L183.61 254.58 L177.26 253.97 L191.4 245.3 L192.24 241.13 L198.05 240.89 L201.37 253.93 L197.59 262.38 Z"
  },
  {
    "municipality_id": "0509",
    "municipality": "Sertã",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M178.4 252.41 L172.09 255.98 L165.16 252.85 L161.27 256.07 L160.45 250.64 L157.68 251.11 L156.33 247.45 L157.86 243.82 L168.03 239.37 L170.87 232.69 L187.0 242.56 L185.99 247.92 L178.4 252.41 Z"
  },
  {
    "municipality_id": "0511",
    "municipality": "Vila Velha de Ródão",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M204.34 265.55 L202.86 270.1 L194.49 276.03 L198.98 255.68 L203.69 255.53 L211.08 248.76 L212.53 254.22 L221.25 255.03 L219.58 262.36 L209.77 266.96 L206.95 264.22 L204.34 265.55 Z"
  },
  {
    "municipality_id": "0510",
    "municipality": "Vila de Rei",
    "district": "Castelo Branco",
    "districtDisplay": "Castelo Branco",
    "district_id": "05",
    "path": "M160.88 257.69 L166.36 252.6 L171.32 255.8 L175.74 255.15 L173.76 263.45 L175.82 267.72 L160.84 265.06 L160.88 257.69 Z"
  },
  {
    "municipality_id": "0601",
    "municipality": "Arganil",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M174.66 209.33 L172.25 206.08 L166.13 205.68 L166.87 200.98 L163.37 200.15 L170.93 195.47 L171.62 199.21 L173.94 198.17 L176.59 201.88 L182.73 195.18 L197.65 202.78 L195.57 208.05 L189.55 205.01 L182.39 212.73 L180.48 212.8 L180.42 207.36 L174.66 209.33 Z"
  },
  {
    "municipality_id": "0602",
    "municipality": "Cantanhede",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M130.91 198.41 L128.9 195.14 L119.91 194.3 L118.95 196.39 L111.76 192.57 L113.48 186.03 L123.14 187.85 L124.68 180.71 L128.82 182.26 L130.54 175.95 L133.75 178.15 L133.91 184.97 L139.37 182.68 L141.27 187.58 L140.92 193.96 L137.3 193.91 L139.59 201.18 L135.54 200.64 L134.36 196.36 L130.91 198.41 Z"
  },
  {
    "municipality_id": "0603",
    "municipality": "Coimbra",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M145.14 214.25 L139.85 214.08 L140.35 209.71 L135.98 208.37 L135.49 210.98 L135.49 204.54 L132.28 199.38 L134.36 196.36 L135.54 200.64 L139.59 201.18 L139.08 196.69 L143.38 197.78 L147.38 190.11 L149.79 191.25 L148.63 197.12 L154.79 207.13 L150.4 208.15 L150.55 215.11 L147.42 216.81 L145.14 214.25 Z"
  },
  {
    "municipality_id": "0604",
    "municipality": "Condeixa-a-Nova",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M143.31 218.66 L145.44 222.94 L141.11 224.08 L132.56 217.36 L135.98 208.37 L140.83 210.0 L139.85 214.08 L147.16 214.51 L147.26 219.02 L143.31 218.66 Z"
  },
  {
    "municipality_id": "0605",
    "municipality": "Figueira da Foz",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M107.63 222.03 L110.25 212.26 L106.55 207.33 L111.76 192.57 L120.19 196.3 L123.48 208.89 L117.34 215.05 L120.76 223.72 L116.68 223.12 L115.21 225.75 L107.63 222.03 Z"
  },
  {
    "municipality_id": "0606",
    "municipality": "Góis",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M175.03 209.64 L180.42 207.36 L180.49 212.82 L184.27 214.89 L175.48 216.83 L177.59 225.53 L173.93 226.65 L171.84 231.47 L167.48 224.96 L168.48 219.6 L165.61 217.81 L167.85 211.68 L166.32 205.25 L172.25 206.08 L175.03 209.64 Z"
  },
  {
    "municipality_id": "0607",
    "municipality": "Lousã",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M165.29 218.25 L163.12 221.78 L156.06 217.3 L155.62 208.27 L166.11 205.64 L167.85 211.68 L165.29 218.25 Z"
  },
  {
    "municipality_id": "0608",
    "municipality": "Mira",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M124.25 182.37 L122.98 187.96 L113.48 186.03 L116.94 172.19 L124.25 182.37 Z"
  },
  {
    "municipality_id": "0609",
    "municipality": "Miranda do Corvo",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M160.43 220.32 L156.87 224.52 L147.26 219.11 L152.08 206.8 L156.79 209.79 L154.89 214.9 L160.43 220.32 Z"
  },
  {
    "municipality_id": "0610",
    "municipality": "Montemor-o-Velho",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M125.06 211.56 L127.71 213.78 L117.34 215.05 L123.48 208.89 L119.91 194.3 L132.55 197.39 L135.49 204.54 L135.24 212.39 L127.13 208.6 L125.06 211.56 Z M133.28 210.69 L133.56 210.99 L133.73 210.91 L133.29 210.55 L133.28 210.69 Z"
  },
  {
    "municipality_id": "0611",
    "municipality": "Oliveira do Hospital",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M189.51 197.14 L184.36 197.35 L181.6 193.39 L187.31 192.83 L188.06 188.8 L184.3 182.68 L193.88 174.65 L196.42 178.98 L192.56 183.56 L196.43 184.5 L195.81 190.38 L199.6 192.22 L193.32 199.68 L189.51 197.14 Z"
  },
  {
    "municipality_id": "0612",
    "municipality": "Pampilhosa da Serra",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M171.71 231.43 L173.93 226.65 L177.59 225.53 L175.47 216.84 L183.65 216.25 L181.93 212.51 L189.15 205.21 L193.08 207.59 L194.26 205.89 L201.49 214.13 L198.5 220.46 L197.35 218.15 L194.96 219.08 L195.67 223.46 L191.33 221.03 L186.95 223.8 L188.09 226.95 L183.96 227.0 L183.18 229.64 L179.01 228.4 L179.7 230.2 L177.57 228.9 L177.44 231.44 L173.18 230.93 L173.01 233.34 L169.45 233.98 L171.71 231.43 Z"
  },
  {
    "municipality_id": "0613",
    "municipality": "Penacova",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M149.66 197.65 L148.63 194.29 L152.12 188.14 L159.83 193.18 L166.29 190.88 L170.69 192.24 L171.34 195.28 L165.84 200.03 L152.58 204.2 L149.66 197.65 Z"
  },
  {
    "municipality_id": "0614",
    "municipality": "Penela",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M154.2 228.92 L149.92 235.26 L147.07 234.66 L149.3 231.95 L147.15 226.29 L141.69 224.46 L145.44 222.94 L143.1 218.26 L156.87 224.52 L157.47 231.53 L154.2 228.92 Z"
  },
  {
    "municipality_id": "0615",
    "municipality": "Soure",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M120.77 223.61 L118.25 214.67 L127.69 213.79 L125.06 211.56 L127.13 208.6 L134.75 212.29 L132.56 217.36 L143.05 225.91 L136.4 232.6 L135.21 224.54 L127.98 228.17 L125.36 223.97 L120.77 223.61 Z M145.32 226.9 L145.69 227.16 L145.47 227.49 L144.99 226.92 L145.32 226.9 Z M133.3 210.61 L133.7 210.87 L133.69 210.97 L133.53 210.98 L133.3 210.61 Z"
  },
  {
    "municipality_id": "0616",
    "municipality": "Tábua",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M177.58 199.96 L176.55 201.88 L173.94 198.17 L171.62 199.21 L169.28 191.26 L184.3 182.68 L188.06 188.8 L187.31 192.83 L181.99 192.93 L181.89 196.73 L177.58 199.96 Z"
  },
  {
    "municipality_id": "0617",
    "municipality": "Vila Nova de Poiares",
    "district": "Coimbra",
    "districtDisplay": "Coimbra",
    "district_id": "06",
    "path": "M162.03 207.95 L154.96 208.24 L152.58 204.2 L159.7 200.49 L166.86 200.97 L166.06 205.6 L162.03 207.95 Z"
  },
  {
    "municipality_id": "0801",
    "municipality": "Albufeira",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M155.41 536.04 L155.39 536.07 L155.36 536.05 L155.38 536.02 L155.41 536.04 Z M156.29 536.06 L156.29 536.03 L156.32 536.02 L156.31 536.05 L156.29 536.06 Z M156.42 536.02 L156.42 536.01 L156.43 536.01 L156.43 536.02 L156.42 536.02 Z M156.34 536.0 L156.36 536.0 L156.35 536.01 L156.34 536.0 Z M156.49 536.01 L156.49 535.98 L156.5 535.98 L156.5 536.0 L156.49 536.01 Z M156.06 535.99 L156.06 535.98 L156.07 535.98 L156.07 535.99 L156.06 535.99 Z M155.98 535.98 L156.0 535.95 L156.02 535.94 L156.02 535.97 L155.98 535.98 Z M155.52 535.91 L155.53 535.91 L155.52 535.91 Z M156.7 535.91 L156.7 535.9 L156.71 535.89 L156.71 535.91 L156.7 535.91 Z M157.03 535.87 L157.02 535.85 L157.04 535.84 L157.04 535.86 L157.03 535.87 Z M156.75 535.87 L156.74 535.85 L156.74 535.82 L156.77 535.86 L156.75 535.87 Z M154.62 535.76 L154.63 535.76 L154.62 535.76 Z M154.59 535.75 L154.6 535.75 L154.59 535.75 Z M154.58 535.74 L154.59 535.74 L154.58 535.74 Z M154.61 535.72 L154.61 535.71 L154.61 535.72 Z M154.54 535.71 L154.54 535.7 L154.55 535.7 L154.54 535.71 Z M157.18 535.64 L157.18 535.63 L157.19 535.63 L157.18 535.65 L157.18 535.64 Z M157.21 535.63 L157.21 535.62 L157.21 535.63 Z M157.09 528.4 L160.19 527.65 L160.84 520.82 L166.42 522.59 L163.95 530.83 L169.84 535.84 L164.98 534.08 L154.48 535.7 L152.93 532.61 L157.09 528.4 Z M157.21 535.61 L157.22 535.61 L157.21 535.61 Z M157.96 535.36 L157.96 535.34 L157.98 535.32 L157.99 535.34 L157.96 535.36 Z M160.79 534.94 L160.78 534.93 L160.79 534.92 L160.79 534.94 Z M160.96 534.94 L160.95 534.94 L160.94 534.93 L160.96 534.93 L160.96 534.94 Z M160.96 534.92 L160.95 534.92 L160.96 534.92 Z M161.06 534.92 L161.06 534.9 L161.07 534.9 L161.07 534.91 L161.06 534.92 Z M161.03 534.91 L161.03 534.9 L161.04 534.91 L161.03 534.91 Z M160.61 534.89 L160.61 534.88 L160.62 534.87 L160.62 534.9 L160.61 534.89 Z M161.03 534.87 L161.04 534.87 L161.03 534.87 Z M161.27 534.74 L161.26 534.74 L161.26 534.73 L161.27 534.73 L161.27 534.74 Z M161.24 534.74 L161.24 534.73 L161.25 534.72 L161.25 534.74 L161.24 534.74 Z M161.22 534.72 L161.22 534.71 L161.24 534.71 L161.24 534.72 L161.22 534.72 Z M161.28 534.7 L161.28 534.69 L161.29 534.7 L161.28 534.7 Z M161.25 534.68 L161.26 534.68 L161.26 534.69 L161.25 534.68 Z M162.29 534.64 L162.29 534.63 L162.3 534.63 L162.3 534.64 L162.29 534.64 Z"
  },
  {
    "municipality_id": "0802",
    "municipality": "Alcoutim",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M212.94 504.55 L211.33 513.95 L207.93 514.43 L203.29 511.62 L200.34 503.76 L191.0 503.36 L189.21 498.64 L204.63 490.65 L212.39 491.88 L216.25 487.71 L223.1 488.34 L227.9 504.37 L217.18 501.89 L212.94 504.55 Z"
  },
  {
    "municipality_id": "0803",
    "municipality": "Aljezur",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M104.0 526.45 L104.02 526.45 L104.01 526.46 L104.0 526.46 L104.0 526.45 Z M104.06 525.32 L104.07 525.31 L104.07 525.33 L104.06 525.32 Z M104.09 525.28 L104.1 525.29 L104.09 525.29 L104.09 525.28 Z M104.1 525.21 L104.09 525.22 L104.09 525.21 L104.1 525.21 Z M104.1 525.2 L104.09 525.21 L104.09 525.2 L104.1 525.2 Z M103.79 525.0 L103.79 525.03 L103.76 525.02 L103.77 525.0 L103.79 525.0 Z M103.81 525.0 Z M103.95 525.01 L103.95 524.99 L103.97 524.99 L103.96 525.0 L103.95 525.01 Z M103.86 524.96 L103.86 524.97 L103.85 524.96 L103.86 524.96 Z M103.58 524.77 L103.61 524.75 L103.62 524.75 L103.61 524.78 L103.58 524.77 Z M103.66 524.76 L103.65 524.73 L103.73 524.71 L103.69 524.75 L103.66 524.76 Z M103.64 524.64 L103.64 524.65 L103.64 524.66 L103.63 524.65 L103.64 524.64 Z M103.65 524.63 L103.65 524.62 L103.67 524.61 L103.66 524.64 L103.65 524.63 Z M103.72 524.58 L103.69 524.6 L103.68 524.59 L103.72 524.55 L103.72 524.58 Z M103.75 524.56 L103.74 524.56 L103.75 524.56 Z M103.54 523.91 L103.52 523.92 L103.51 523.91 L103.54 523.89 L103.54 523.91 Z M103.54 523.84 L103.54 523.83 L103.56 523.84 L103.55 523.84 L103.54 523.84 Z M103.68 523.66 L103.69 523.65 L103.7 523.66 L103.69 523.66 L103.68 523.66 Z M103.7 523.49 L103.71 523.49 L103.7 523.5 L103.7 523.49 Z M103.66 523.27 Z M103.58 523.19 L103.59 523.2 L103.58 523.2 L103.58 523.19 Z M103.51 523.15 Z M103.52 523.15 L103.53 523.15 L103.52 523.15 Z M103.48 523.13 L103.49 523.14 L103.48 523.13 Z M103.48 523.11 L103.48 523.12 L103.48 523.11 Z M103.45 523.06 L103.46 523.06 L103.47 523.06 L103.46 523.07 L103.45 523.06 Z M103.26 522.89 L103.27 522.89 L103.26 522.9 L103.26 522.89 Z M103.26 522.87 L103.26 522.88 L103.26 522.87 Z M103.08 522.71 L103.09 522.71 L103.08 522.72 L103.08 522.71 Z M103.1 522.68 L103.09 522.67 L103.09 522.66 L103.11 522.69 L103.1 522.68 Z M103.12 522.61 L103.13 522.61 L103.13 522.62 L103.12 522.62 L103.12 522.61 Z M103.4 522.58 L103.4 522.57 L103.4 522.58 Z M103.3 522.57 L103.29 522.55 L103.33 522.57 L103.32 522.57 L103.3 522.57 Z M104.11 525.31 L104.11 525.3 L104.12 525.28 L104.11 525.32 L104.11 525.31 Z M104.11 525.27 L104.11 525.26 L104.12 525.26 L104.11 525.27 Z M106.3 519.19 L106.31 519.18 L106.31 519.19 L106.3 519.19 Z M106.43 518.8 L106.43 518.81 L106.41 518.81 L106.42 518.79 L106.43 518.8 Z M106.5 512.24 L106.51 512.25 L106.52 512.27 L106.5 512.26 L106.5 512.24 Z M106.66 512.23 L106.67 512.24 L106.66 512.26 L106.66 512.25 L106.66 512.23 Z M106.6 512.3 L106.51 512.21 L106.54 512.17 L106.62 512.26 L106.6 512.3 Z M106.62 512.21 L106.64 512.22 L106.64 512.26 L106.62 512.24 L106.62 512.21 Z M106.67 512.22 L106.63 512.2 L106.63 512.15 L106.68 512.19 L106.67 512.22 Z M106.66 512.15 L106.67 512.16 L106.67 512.17 L106.65 512.15 L106.66 512.15 Z M106.58 512.13 L106.58 512.12 L106.58 512.13 Z M106.71 512.1 L106.71 512.09 L106.71 512.08 L106.71 512.09 L106.71 512.1 Z M106.59 512.08 L106.58 512.08 L106.59 512.08 Z M106.65 512.07 L106.7 512.06 L106.69 512.1 L106.68 512.1 L106.65 512.07 Z M106.63 512.01 L106.64 512.02 L106.64 512.03 L106.62 512.03 L106.63 512.01 Z M106.69 511.98 L106.7 512.0 L106.69 511.99 L106.69 511.98 Z M106.73 511.48 L106.73 511.49 L106.72 511.49 L106.73 511.48 Z M106.71 511.48 L106.7 511.49 L106.7 511.48 L106.71 511.48 Z M106.71 511.47 L106.72 511.46 L106.72 511.47 L106.71 511.47 Z M106.73 510.46 L106.74 510.46 L106.74 510.47 L106.73 510.47 L106.73 510.46 Z M106.6 510.31 L106.6 510.32 L106.59 510.33 L106.59 510.32 L106.6 510.31 Z M106.63 510.31 L106.62 510.32 L106.62 510.31 L106.63 510.31 Z M106.69 510.09 L106.7 510.06 L106.72 510.05 L106.74 510.1 L106.69 510.09 Z M106.7 510.02 L106.7 510.04 L106.69 510.04 L106.69 510.02 L106.7 510.02 Z M106.72 509.99 L106.72 510.01 L106.71 510.01 L106.71 509.99 L106.72 509.99 Z M106.62 509.98 L106.63 509.94 L106.66 510.02 L106.64 510.02 L106.62 509.98 Z M106.71 509.94 L106.71 509.95 L106.69 509.96 L106.7 509.95 L106.71 509.94 Z M106.7 509.92 L106.7 509.95 L106.69 509.95 L106.69 509.94 L106.7 509.92 Z M106.6 509.65 L106.62 509.67 L106.62 509.68 L106.6 509.67 L106.6 509.65 Z M106.52 509.63 L106.53 509.64 L106.54 509.67 L106.52 509.65 L106.52 509.63 Z M106.54 509.63 L106.55 509.65 L106.55 509.66 L106.53 509.64 L106.54 509.63 Z M106.53 509.62 L106.52 509.58 L106.58 509.61 L106.57 509.64 L106.53 509.62 Z M106.56 509.5 L106.58 509.6 L106.45 509.43 L106.49 509.42 L106.56 509.5 Z M113.98 523.46 L105.77 527.62 L103.12 522.76 L107.23 517.41 L108.07 514.98 L106.7 512.19 L107.0 511.76 L106.67 511.05 L106.83 511.07 L107.12 510.58 L106.62 509.54 L109.45 506.29 L113.58 496.73 L123.82 503.31 L117.74 510.87 L118.19 516.05 L113.98 523.46 Z M107.33 514.14 L107.33 514.15 L107.33 514.17 L107.32 514.15 L107.33 514.14 Z M107.36 514.07 L107.37 514.1 L107.35 514.1 L107.35 514.07 L107.36 514.07 Z M107.3 514.07 L107.32 514.04 L107.34 514.06 L107.3 514.1 L107.3 514.07 Z M107.53 513.27 L107.53 513.28 L107.52 513.28 L107.52 513.27 L107.53 513.27 Z M107.61 513.2 L107.6 513.19 L107.61 513.19 L107.61 513.2 Z M107.5 513.19 L107.51 513.18 L107.54 513.17 L107.53 513.19 L107.5 513.19 Z M107.48 513.18 L107.47 513.16 L107.49 513.16 L107.49 513.17 L107.48 513.18 Z M106.74 512.03 L106.73 512.03 L106.73 512.01 L106.73 512.02 L106.74 512.03 Z M106.86 511.87 L106.88 511.87 L106.88 511.9 L106.87 511.89 L106.86 511.87 Z M106.89 511.85 L106.9 511.83 L106.91 511.83 L106.9 511.86 L106.89 511.85 Z M106.91 511.74 L106.9 511.74 L106.91 511.74 Z M106.86 511.73 L106.86 511.72 L106.87 511.72 L106.87 511.73 L106.86 511.73 Z M106.84 511.71 L106.84 511.72 L106.83 511.72 L106.83 511.71 L106.84 511.71 Z M106.75 511.69 L106.75 511.68 L106.77 511.7 L106.76 511.71 L106.75 511.69 Z M106.87 511.53 L106.89 511.54 L106.88 511.55 L106.87 511.55 L106.87 511.53 Z M106.83 511.49 L106.84 511.49 L106.87 511.53 L106.86 511.53 L106.83 511.49 Z M106.77 511.02 L106.77 511.01 L106.8 511.04 L106.78 511.03 L106.77 511.02 Z M106.77 510.95 L106.79 510.93 L106.8 510.96 L106.77 510.95 Z M107.02 510.7 L107.03 510.71 L107.02 510.71 L107.02 510.7 Z M107.06 510.55 L107.06 510.54 L107.05 510.53 L107.07 510.53 L107.06 510.55 Z M106.75 510.5 L106.76 510.5 L106.75 510.5 Z M106.86 510.48 L106.87 510.48 L106.87 510.49 L106.86 510.49 L106.86 510.48 Z M106.77 510.48 L106.77 510.49 L106.76 510.49 L106.77 510.48 Z M106.79 510.45 L106.79 510.47 L106.78 510.46 L106.79 510.45 Z M106.76 510.43 L106.77 510.43 L106.77 510.44 L106.76 510.44 L106.76 510.43 Z M106.77 510.41 L106.77 510.42 L106.76 510.41 L106.77 510.41 Z M106.77 510.38 L106.77 510.39 L106.77 510.38 Z M106.74 510.37 L106.74 510.38 L106.73 510.37 L106.74 510.37 Z M106.74 510.02 L106.75 510.03 L106.73 510.05 L106.73 510.04 L106.74 510.02 Z M109.44 505.86 L109.44 505.84 L109.45 505.84 L109.45 505.85 L109.44 505.86 Z M110.46 503.69 L110.48 503.69 L110.48 503.7 L110.46 503.7 L110.46 503.69 Z M110.73 503.48 L110.71 503.49 L110.7 503.48 L110.73 503.48 Z M110.73 503.6 L110.72 503.59 L110.72 503.58 L110.74 503.59 L110.73 503.6 Z M110.71 503.58 L110.73 503.58 L110.71 503.58 Z M110.72 503.47 L110.73 503.45 L110.73 503.47 L110.72 503.47 Z M111.23 502.56 L111.24 502.55 L111.25 502.55 L111.24 502.56 L111.23 502.56 Z M111.27 502.54 L111.28 502.54 L111.28 502.55 L111.27 502.54 Z M111.25 502.53 L111.26 502.54 L111.27 502.55 L111.26 502.55 L111.25 502.53 Z M111.31 502.41 L111.31 502.4 L111.33 502.41 L111.32 502.42 L111.31 502.41 Z M112.3 500.12 L112.3 500.13 L112.3 500.12 Z M112.3 500.09 L112.31 500.08 L112.32 500.08 L112.29 500.1 L112.3 500.09 Z M112.5 499.75 L112.5 499.74 L112.52 499.76 L112.51 499.76 L112.5 499.75 Z M112.52 499.73 L112.51 499.73 L112.52 499.73 Z M112.48 499.72 L112.45 499.71 L112.46 499.69 L112.5 499.73 L112.48 499.72 Z M112.52 499.7 L112.51 499.68 L112.54 499.72 L112.53 499.72 L112.52 499.7 Z M112.56 498.98 L112.57 498.98 L112.57 498.99 L112.56 498.99 L112.56 498.98 Z M112.54 498.97 L112.54 498.96 L112.55 498.97 L112.54 498.97 Z M112.53 498.94 L112.53 498.93 L112.56 498.96 L112.55 498.96 L112.53 498.94 Z M112.48 498.89 L112.5 498.9 L112.52 498.91 L112.51 498.91 L112.48 498.89 Z M112.5 498.88 L112.51 498.89 L112.52 498.9 L112.5 498.89 L112.5 498.88 Z M112.51 498.89 L112.5 498.87 L112.53 498.9 L112.52 498.89 L112.51 498.89 Z M112.57 498.63 L112.58 498.65 L112.55 498.62 L112.56 498.62 L112.57 498.63 Z M112.66 497.96 L112.64 497.97 L112.63 497.94 L112.65 497.93 L112.66 497.96 Z M112.7 497.86 L112.68 497.88 L112.67 497.85 L112.7 497.83 L112.7 497.86 Z M112.68 497.83 L112.66 497.85 L112.61 497.84 L112.65 497.78 L112.68 497.83 Z M112.69 497.75 L112.69 497.74 L112.72 497.8 L112.7 497.76 L112.69 497.75 Z M112.74 497.74 L112.73 497.71 L112.76 497.77 L112.75 497.76 L112.74 497.74 Z M112.74 497.71 L112.73 497.7 L112.78 497.76 L112.77 497.75 L112.74 497.71 Z M112.84 497.56 L112.83 497.55 L112.85 497.55 L112.85 497.57 L112.84 497.56 Z M112.79 497.48 L112.79 497.49 L112.78 497.49 L112.79 497.48 Z M112.8 497.47 L112.8 497.48 L112.8 497.47 Z"
  },
  {
    "municipality_id": "0804",
    "municipality": "Castro Marim",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M222.18 525.81 L219.81 516.27 L215.78 516.48 L211.31 511.98 L212.94 504.07 L217.1 501.89 L227.9 504.37 L230.01 521.2 L222.18 525.81 Z"
  },
  {
    "municipality_id": "0805",
    "municipality": "Faro",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M190.06 540.14 L192.86 543.68 L196.71 543.37 L191.7 547.49 L180.55 542.54 L183.56 535.65 L180.43 530.98 L184.24 528.25 L194.12 530.55 L195.03 533.68 L190.2 535.94 L190.06 540.14 Z"
  },
  {
    "municipality_id": "0806",
    "municipality": "Lagoa",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M138.01 532.99 L138.0 532.98 L138.02 532.98 L138.01 532.99 Z M138.09 533.0 L138.07 532.97 L138.12 532.98 L138.11 532.99 L138.09 533.0 Z M137.88 532.93 L137.86 532.92 L137.85 532.9 L137.89 532.92 L137.88 532.93 Z M136.9 532.58 L136.9 532.57 L136.93 532.53 L136.95 532.58 L136.9 532.58 Z M136.96 532.42 L136.96 532.41 L136.98 532.41 L136.97 532.42 L136.96 532.42 Z M138.18 532.98 L135.64 529.21 L139.77 524.89 L144.02 528.55 L148.39 528.04 L147.56 533.85 L138.18 532.98 Z M143.38 534.45 L143.38 534.44 L143.39 534.43 L143.4 534.45 L143.38 534.45 Z M145.55 534.27 L145.55 534.26 L145.56 534.25 L145.57 534.27 L145.55 534.27 Z M145.5 534.26 L145.5 534.24 L145.51 534.25 L145.5 534.26 Z M146.65 534.17 L146.66 534.13 L146.67 534.12 L146.66 534.17 L146.65 534.17 Z M147.11 534.06 L147.12 534.05 L147.12 534.06 L147.11 534.06 Z M147.29 533.96 L147.29 533.93 L147.29 533.91 L147.3 533.93 L147.29 533.96 Z"
  },
  {
    "municipality_id": "0807",
    "municipality": "Lagos",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M124.17 535.08 L124.17 535.09 L124.15 535.09 L124.15 535.08 L124.17 535.08 Z M123.84 535.02 L123.84 535.01 L123.86 535.01 L123.86 535.03 L123.84 535.02 Z M123.78 534.88 L123.78 534.89 L123.77 534.91 L123.76 534.88 L123.78 534.88 Z M123.68 534.89 L123.69 534.89 L123.69 534.9 L123.68 534.89 Z M118.32 534.83 L118.33 534.8 L118.34 534.81 L118.32 534.83 Z M124.13 534.19 L124.14 534.18 L124.14 534.17 L124.15 534.19 L124.13 534.19 Z M124.17 534.11 L124.18 534.1 L124.18 534.11 L124.17 534.11 Z M124.11 534.06 L124.1 534.06 L124.1 534.05 L124.11 534.05 L124.11 534.06 Z M124.09 533.92 L124.09 533.9 L124.1 533.92 L124.09 533.92 Z M124.11 533.84 L124.11 533.83 L124.12 533.84 L124.11 533.84 Z M124.14 533.76 L124.14 533.75 L124.15 533.75 L124.15 533.76 L124.14 533.76 Z M124.18 533.72 L124.18 533.73 L124.18 533.72 Z M119.37 534.35 L115.34 535.94 L113.23 529.47 L108.57 526.99 L120.09 518.7 L125.71 523.27 L128.3 530.82 L124.47 532.23 L124.19 535.19 L119.37 534.35 Z M124.18 533.15 L124.19 533.16 L124.18 533.16 L124.18 533.15 Z M124.16 533.15 L124.16 533.14 L124.18 533.15 L124.17 533.16 L124.16 533.15 Z M124.16 533.14 L124.17 533.14 L124.16 533.14 Z M124.17 533.14 L124.17 533.13 L124.18 533.14 L124.17 533.14 Z M124.28 535.08 L124.25 535.07 L124.24 535.04 L124.28 535.05 L124.28 535.08 Z M124.23 535.05 L124.24 535.07 L124.23 535.08 L124.21 535.05 L124.23 535.05 Z M124.29 534.71 L124.29 534.75 L124.26 534.74 L124.27 534.71 L124.29 534.71 Z M124.25 534.72 L124.24 534.71 L124.25 534.71 L124.25 534.72 Z M124.31 534.58 L124.31 534.57 L124.32 534.58 L124.31 534.58 Z M124.28 534.44 L124.29 534.45 L124.28 534.45 L124.28 534.44 Z M124.31 534.43 L124.31 534.42 L124.33 534.42 L124.32 534.44 L124.31 534.43 Z M124.31 534.4 L124.32 534.39 L124.33 534.4 L124.32 534.41 L124.31 534.4 Z M124.22 534.33 L124.23 534.32 L124.23 534.33 L124.22 534.33 Z M124.24 534.31 L124.23 534.32 L124.2 534.29 L124.23 534.28 L124.24 534.31 Z M124.22 534.21 L124.23 534.2 L124.23 534.21 L124.22 534.21 Z M124.32 533.79 L124.31 533.8 L124.3 533.78 L124.32 533.78 L124.32 533.79 Z M124.25 533.74 L124.24 533.73 L124.25 533.74 Z M124.21 533.71 L124.21 533.72 L124.21 533.71 Z M124.23 533.71 L124.23 533.74 L124.2 533.68 L124.21 533.68 L124.23 533.71 Z M124.27 533.45 L124.27 533.46 L124.25 533.45 L124.27 533.45 Z M124.32 533.43 L124.31 533.42 L124.3 533.4 L124.32 533.41 L124.32 533.43 Z M124.19 533.15 L124.18 533.15 L124.19 533.15 Z"
  },
  {
    "municipality_id": "0808",
    "municipality": "Loulé",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M174.51 538.16 L163.95 530.83 L167.52 524.17 L161.0 520.77 L165.65 512.53 L163.83 509.45 L165.18 507.49 L175.01 510.0 L181.36 505.31 L180.55 501.65 L189.13 499.52 L190.78 503.69 L187.69 510.12 L190.43 513.67 L187.98 521.23 L186.73 519.74 L183.58 522.14 L185.45 528.43 L180.11 531.61 L183.56 535.65 L182.11 541.39 L174.51 538.16 Z"
  },
  {
    "municipality_id": "0809",
    "municipality": "Monchique",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M120.95 505.66 L123.43 504.85 L123.59 501.04 L126.7 503.94 L132.33 500.11 L143.71 504.71 L145.19 507.69 L143.76 513.55 L138.52 517.82 L128.07 514.12 L126.69 518.76 L124.72 517.31 L122.36 521.37 L120.89 518.78 L116.9 519.49 L120.95 505.66 Z"
  },
  {
    "municipality_id": "0810",
    "municipality": "Olhão",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M196.78 543.42 L190.62 542.43 L190.01 536.5 L194.36 535.04 L194.13 530.55 L200.77 529.79 L203.96 537.85 L196.78 543.42 Z"
  },
  {
    "municipality_id": "0811",
    "municipality": "Portimão",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M132.93 530.97 L128.39 531.02 L122.84 520.88 L124.72 517.31 L126.69 518.76 L128.07 514.12 L135.64 517.23 L139.63 524.46 L136.26 531.9 L132.93 530.97 Z"
  },
  {
    "municipality_id": "0813",
    "municipality": "Silves",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M154.52 528.72 L152.75 534.27 L149.39 532.89 L148.09 527.55 L142.15 527.83 L135.42 518.7 L143.76 513.55 L145.09 506.13 L142.29 504.18 L145.34 499.42 L153.78 497.29 L157.17 498.76 L157.35 502.8 L163.78 506.27 L165.65 512.53 L161.61 517.18 L160.02 527.96 L154.52 528.72 Z"
  },
  {
    "municipality_id": "0812",
    "municipality": "São Brás de Alportel",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M185.45 528.43 L183.43 522.63 L186.73 519.74 L187.98 521.23 L188.09 516.88 L198.6 516.39 L193.83 523.71 L195.46 530.67 L185.45 528.43 Z"
  },
  {
    "municipality_id": "0814",
    "municipality": "Tavira",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M211.14 533.02 L203.96 537.85 L200.77 529.79 L194.74 529.16 L193.83 523.71 L198.68 516.75 L188.99 515.3 L190.43 513.67 L187.69 510.1 L190.93 502.81 L200.23 503.68 L203.59 511.88 L216.7 516.3 L216.9 528.48 L211.14 533.02 Z"
  },
  {
    "municipality_id": "0816",
    "municipality": "Vila Real de Santo António",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M227.63 524.8 L225.22 523.47 L229.6 520.95 L231.76 525.87 L227.63 524.8 Z M216.76 526.32 L216.66 516.87 L219.66 516.18 L222.3 525.45 L216.9 528.48 L216.76 526.32 Z"
  },
  {
    "municipality_id": "0815",
    "municipality": "Vila do Bispo",
    "district": "Faro",
    "districtDisplay": "Faro",
    "district_id": "08",
    "path": "M97.18 541.35 L97.2 541.35 L97.2 541.36 L97.18 541.37 L97.18 541.35 Z M96.27 540.97 L96.26 540.95 L96.28 540.93 L96.29 540.97 L96.27 540.97 Z M96.79 540.07 L96.79 540.19 L96.61 540.18 L96.68 540.09 L96.79 540.07 Z M97.67 537.88 L97.66 537.83 L97.69 537.86 L97.67 537.88 Z M97.71 537.55 L97.72 537.54 L97.74 537.56 L97.73 537.56 L97.71 537.55 Z M97.65 537.51 L97.62 537.49 L97.64 537.49 L97.65 537.51 Z M97.73 537.48 L97.74 537.46 L97.76 537.48 L97.74 537.49 L97.73 537.48 Z M97.69 537.47 L97.67 537.46 L97.67 537.44 L97.69 537.46 L97.69 537.47 Z M97.76 537.35 L97.76 537.34 L97.78 537.35 L97.78 537.36 L97.76 537.35 Z M97.84 537.34 L97.83 537.33 L97.83 537.31 L97.85 537.33 L97.84 537.34 Z M97.83 537.31 L97.82 537.32 L97.8 537.3 L97.82 537.3 L97.83 537.31 Z M97.8 537.26 L97.8 537.25 L97.82 537.28 L97.81 537.28 L97.8 537.26 Z M98.03 537.16 L98.05 537.18 L98.04 537.2 L98.01 537.16 L98.03 537.16 Z M98.35 536.82 L98.36 536.82 L98.36 536.84 L98.35 536.82 Z M98.34 536.82 L98.34 536.84 L98.33 536.83 L98.32 536.84 L98.3 536.83 L98.34 536.82 Z M99.99 533.03 L99.99 533.02 L100.01 533.01 L100.0 533.03 L99.99 533.03 Z M99.96 533.01 L99.98 533.0 L99.99 532.99 L99.98 533.02 L99.96 533.01 Z M99.95 532.98 L99.97 532.98 L99.96 532.99 L99.95 532.98 Z M103.13 541.8 L103.14 541.8 L103.15 541.81 L103.14 541.82 L103.13 541.8 Z M103.15 541.78 L103.17 541.74 L103.2 541.75 L103.19 541.78 L103.15 541.78 Z M103.12 541.73 L103.1 541.75 L103.06 541.73 L103.1 541.69 L103.12 541.73 Z M103.04 541.67 L103.05 541.72 L103.01 541.77 L102.99 541.7 L103.04 541.67 Z M102.8 541.67 L102.81 541.66 L102.82 541.67 L102.8 541.69 L102.8 541.67 Z M102.95 541.65 L102.94 541.75 L102.86 541.7 L102.88 541.6 L102.95 541.65 Z M102.83 541.64 L102.83 541.65 L102.82 541.65 L102.82 541.63 L102.83 541.64 Z M103.07 541.54 L103.05 541.55 L103.04 541.53 L103.07 541.52 L103.07 541.54 Z M103.28 541.24 L103.28 541.23 L103.29 541.21 L103.3 541.23 L103.28 541.24 Z M103.88 540.95 L103.89 540.95 L103.89 540.96 L103.88 540.96 L103.88 540.95 Z M103.85 540.93 L103.85 540.92 L103.86 540.91 L103.85 540.94 L103.85 540.93 Z M103.98 540.88 L103.98 540.87 L103.99 540.88 L103.98 540.88 Z M104.92 539.0 L100.42 544.02 L99.12 540.66 L96.3 540.91 L97.82 538.69 L97.86 537.32 L98.74 536.07 L99.28 535.93 L99.63 533.4 L103.51 527.17 L109.15 525.96 L115.34 535.94 L104.92 539.0 Z M100.03 533.07 L100.02 533.07 L100.02 533.06 L100.03 533.05 L100.03 533.07 Z M100.01 533.03 L100.02 533.02 L100.04 533.02 L100.03 533.03 L100.01 533.03 Z"
  },
  {
    "municipality_id": "0901",
    "municipality": "Aguiar da Beira",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M217.35 154.3 L212.85 151.85 L214.44 148.11 L209.83 144.72 L215.42 135.01 L218.91 135.4 L226.37 146.08 L221.7 152.93 L217.35 154.3 Z"
  },
  {
    "municipality_id": "0902",
    "municipality": "Almeida",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M264.42 172.2 L260.41 176.36 L256.52 169.89 L259.66 151.67 L265.86 144.82 L274.18 143.86 L276.91 156.7 L272.93 166.82 L276.54 168.41 L277.05 172.52 L274.05 176.22 L264.42 172.2 Z"
  },
  {
    "municipality_id": "0903",
    "municipality": "Celorico da Beira",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M223.11 171.8 L219.37 168.28 L220.02 164.09 L222.83 163.18 L226.46 154.18 L239.49 153.2 L238.43 159.53 L236.21 159.6 L230.46 170.33 L226.09 169.14 L223.11 171.8 Z"
  },
  {
    "municipality_id": "0904",
    "municipality": "Figueira de Castelo Rodrigo",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M270.41 144.33 L263.36 147.67 L250.3 135.6 L251.73 124.15 L260.14 123.08 L262.18 117.36 L265.35 118.03 L275.39 133.47 L274.45 143.41 L270.41 144.33 Z"
  },
  {
    "municipality_id": "0905",
    "municipality": "Fornos de Algodres",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M221.96 161.44 L219.37 168.28 L217.12 166.82 L218.05 162.99 L213.17 166.25 L216.56 154.82 L221.7 152.93 L222.88 148.54 L226.18 147.08 L223.28 151.43 L226.61 154.62 L221.96 161.44 Z"
  },
  {
    "municipality_id": "0906",
    "municipality": "Gouveia",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M217.23 181.35 L213.24 186.25 L206.14 176.74 L200.83 175.37 L203.08 169.89 L218.02 162.98 L217.12 166.82 L222.0 168.85 L225.64 178.35 L217.23 181.35 Z"
  },
  {
    "municipality_id": "0907",
    "municipality": "Guarda",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M237.06 183.08 L232.92 186.72 L226.1 185.75 L226.91 181.19 L222.94 173.48 L226.09 169.14 L230.46 170.33 L239.26 154.65 L242.2 155.59 L244.1 152.94 L245.34 163.22 L250.74 158.88 L252.0 163.44 L257.49 164.74 L254.32 169.79 L256.37 177.62 L249.29 183.29 L245.47 180.83 L242.34 183.58 L237.06 183.08 Z"
  },
  {
    "municipality_id": "0908",
    "municipality": "Manteigas",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M217.36 193.58 L211.34 193.2 L214.58 182.48 L225.64 178.37 L226.1 185.75 L221.26 185.59 L217.36 193.58 Z"
  },
  {
    "municipality_id": "0909",
    "municipality": "Mêda",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M238.08 136.21 L233.0 135.54 L233.1 131.62 L229.98 131.59 L233.93 124.45 L229.59 120.12 L240.22 120.75 L244.13 117.55 L246.53 120.26 L245.14 128.15 L249.31 130.29 L244.42 139.98 L238.08 136.21 Z"
  },
  {
    "municipality_id": "0910",
    "municipality": "Pinhel",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M246.84 163.33 L244.13 152.95 L242.2 155.59 L239.26 154.65 L240.67 149.2 L244.74 148.81 L242.61 143.1 L251.8 124.34 L250.3 135.61 L263.95 148.46 L259.66 151.67 L257.49 164.74 L252.0 163.44 L250.74 158.88 L246.84 163.33 Z"
  },
  {
    "municipality_id": "0911",
    "municipality": "Sabugal",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M236.84 198.3 L234.0 195.98 L238.54 191.14 L239.46 182.57 L242.34 183.58 L245.5 180.83 L249.29 183.29 L253.81 180.11 L256.37 177.62 L255.2 168.63 L260.41 176.36 L264.67 172.05 L274.05 176.22 L273.7 182.77 L278.44 188.01 L270.91 199.13 L264.84 199.47 L259.54 196.08 L254.16 197.42 L251.79 192.56 L247.87 198.51 L236.84 198.3 Z"
  },
  {
    "municipality_id": "0912",
    "municipality": "Seia",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M203.53 199.69 L197.69 202.97 L194.31 199.94 L199.6 192.22 L195.81 190.38 L196.43 184.5 L192.22 182.14 L196.42 178.98 L194.33 173.64 L202.5 170.71 L200.85 175.51 L206.14 176.74 L213.67 186.26 L210.87 195.56 L203.53 199.69 Z"
  },
  {
    "municipality_id": "0913",
    "municipality": "Trancoso",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M229.52 152.89 L226.78 154.32 L223.28 151.43 L226.44 147.17 L222.73 142.34 L227.78 134.36 L229.65 135.38 L229.98 131.59 L232.68 131.41 L232.76 135.37 L235.49 134.28 L244.15 139.98 L242.6 145.12 L245.29 147.36 L243.91 149.99 L240.67 149.2 L239.77 153.49 L229.52 152.89 Z M229.49 131.29 L228.16 134.17 L225.77 133.27 L226.57 129.81 L229.49 131.29 Z"
  },
  {
    "municipality_id": "0914",
    "municipality": "Vila Nova de Foz Côa",
    "district": "Guarda",
    "districtDisplay": "Guarda",
    "district_id": "09",
    "path": "M233.23 119.0 L235.16 107.0 L246.65 108.06 L250.25 102.4 L249.33 106.81 L253.04 107.99 L251.62 112.77 L261.74 119.38 L259.74 123.28 L251.73 124.15 L248.88 129.48 L245.14 128.15 L245.63 118.18 L242.0 117.79 L240.22 120.75 L233.23 119.0 Z"
  },
  {
    "municipality_id": "1001",
    "municipality": "Alcobaça",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M98.35 284.47 L88.61 283.59 L86.24 279.36 L89.12 274.88 L93.1 278.14 L93.0 271.88 L99.47 270.86 L101.02 264.43 L92.72 264.03 L95.47 254.18 L99.0 257.13 L100.99 255.71 L105.63 262.0 L105.68 270.96 L109.55 273.02 L102.84 291.21 L99.73 291.83 L97.37 288.57 L99.63 286.72 L98.35 284.47 Z"
  },
  {
    "municipality_id": "1002",
    "municipality": "Alvaiázere",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M153.47 244.09 L153.76 251.97 L143.31 255.62 L141.28 241.34 L149.82 242.28 L151.23 238.65 L155.29 237.68 L153.47 244.09 Z"
  },
  {
    "municipality_id": "1003",
    "municipality": "Ansião",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M141.48 241.15 L136.4 232.6 L143.03 225.35 L145.49 227.49 L145.57 224.43 L149.3 231.95 L147.07 234.66 L152.05 232.66 L152.96 235.79 L150.58 236.93 L150.53 242.06 L141.48 241.15 Z"
  },
  {
    "municipality_id": "1004",
    "municipality": "Batalha",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M121.59 262.36 L125.41 273.17 L124.08 274.51 L119.72 268.15 L108.95 263.8 L112.39 259.22 L121.59 262.36 Z"
  },
  {
    "municipality_id": "1005",
    "municipality": "Bombarral",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M88.13 305.52 L83.19 309.82 L81.88 300.35 L79.08 298.87 L83.06 296.58 L86.04 299.15 L90.62 298.04 L88.13 305.52 Z"
  },
  {
    "municipality_id": "1006",
    "municipality": "Caldas da Rainha",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M93.53 296.99 L89.95 291.9 L80.97 290.15 L79.15 287.2 L85.96 278.54 L88.61 283.59 L93.18 282.31 L99.87 284.92 L97.35 288.53 L99.82 291.59 L98.78 301.09 L91.34 301.07 L90.62 298.04 L93.53 296.99 Z"
  },
  {
    "municipality_id": "1007",
    "municipality": "Castanheira de Pêra",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M163.12 221.78 L165.61 217.81 L168.48 219.6 L162.56 232.98 L160.54 231.77 L163.12 221.78 Z"
  },
  {
    "municipality_id": "1008",
    "municipality": "Figueiró dos Vinhos",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M153.44 243.67 L155.64 238.37 L151.11 238.96 L150.58 236.93 L154.67 228.45 L157.47 231.53 L156.06 225.58 L161.21 220.2 L163.12 221.78 L158.92 235.34 L162.01 242.61 L157.77 243.9 L155.41 249.07 L152.85 248.0 L153.44 243.67 Z"
  },
  {
    "municipality_id": "1009",
    "municipality": "Leiria",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M105.87 265.27 L103.54 260.04 L109.52 250.93 L106.57 249.66 L104.72 241.43 L107.52 239.73 L101.48 238.93 L104.48 230.63 L118.34 237.82 L120.82 244.04 L129.45 248.66 L124.79 251.64 L124.85 257.85 L128.68 259.28 L127.18 263.0 L122.93 265.37 L121.59 262.36 L112.39 259.22 L105.87 265.27 Z"
  },
  {
    "municipality_id": "1010",
    "municipality": "Marinha Grande",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M101.04 256.79 L95.47 254.18 L96.16 251.8 L101.45 238.96 L106.42 238.76 L104.72 241.43 L109.01 254.18 L104.14 259.83 L101.04 256.79 Z"
  },
  {
    "municipality_id": "1011",
    "municipality": "Nazaré",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M89.16 274.83 L92.72 264.03 L101.02 264.43 L98.68 272.02 L93.0 271.88 L93.11 278.14 L89.16 274.83 Z"
  },
  {
    "municipality_id": "1013",
    "municipality": "Pedrógão Grande",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M164.83 240.27 L162.01 242.61 L158.92 235.31 L160.11 231.92 L164.8 230.73 L166.18 223.43 L171.37 231.28 L168.66 238.58 L164.83 240.27 Z"
  },
  {
    "municipality_id": "1014",
    "municipality": "Peniche",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M75.73 293.34 L77.31 298.69 L73.95 302.24 L64.83 294.09 L74.51 290.86 L75.73 293.34 Z M57.05 287.68 L57.14 288.25 L56.15 288.7 L56.52 287.66 L57.05 287.68 Z"
  },
  {
    "municipality_id": "1015",
    "municipality": "Pombal",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M127.6 246.89 L120.82 244.04 L116.77 236.7 L104.48 230.63 L107.58 222.21 L115.21 225.75 L117.99 222.78 L125.36 223.97 L127.98 228.17 L132.25 224.23 L135.34 224.67 L135.43 231.52 L141.89 238.57 L141.24 244.46 L131.92 250.71 L127.6 246.89 Z"
  },
  {
    "municipality_id": "1016",
    "municipality": "Porto de Mós",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M106.52 282.06 L109.55 273.02 L106.46 272.42 L104.05 266.41 L108.95 263.8 L119.72 268.15 L124.08 274.49 L121.85 277.67 L119.24 276.78 L120.61 281.96 L106.52 282.06 Z"
  },
  {
    "municipality_id": "1012",
    "municipality": "Óbidos",
    "district": "Leiria",
    "districtDisplay": "Leiria",
    "district_id": "10",
    "path": "M87.91 297.44 L86.04 299.15 L82.34 296.76 L78.2 300.03 L74.51 290.86 L79.34 286.68 L80.96 290.14 L89.95 291.9 L93.53 296.96 L87.91 297.44 Z"
  },
  {
    "municipality_id": "1101",
    "municipality": "Alenquer",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M94.17 329.74 L87.61 328.54 L84.64 321.05 L86.97 318.36 L85.51 312.88 L89.35 314.64 L97.18 312.56 L103.38 316.1 L104.79 321.28 L101.76 320.85 L101.27 328.4 L103.32 328.72 L102.9 332.38 L94.17 329.74 Z"
  },
  {
    "municipality_id": "1115",
    "municipality": "Amadora",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M80.79 359.72 L80.27 361.54 L75.83 359.63 L77.75 353.7 L80.79 359.72 Z"
  },
  {
    "municipality_id": "1102",
    "municipality": "Arruda dos Vinhos",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M90.99 339.81 L84.79 339.67 L83.28 334.79 L89.1 333.94 L90.16 329.31 L94.18 329.72 L95.85 336.59 L90.19 335.78 L90.99 339.81 Z"
  },
  {
    "municipality_id": "1103",
    "municipality": "Azambuja",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M101.42 328.1 L101.76 320.85 L104.79 321.22 L103.38 316.1 L97.8 312.74 L99.19 307.01 L108.34 305.95 L113.05 312.0 L105.34 314.55 L113.92 321.52 L115.99 326.4 L105.71 331.82 L101.42 328.1 Z"
  },
  {
    "municipality_id": "1104",
    "municipality": "Cadaval",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M93.19 313.95 L89.35 314.64 L83.61 309.94 L93.74 299.46 L100.32 302.14 L97.8 312.74 L93.19 313.95 Z"
  },
  {
    "municipality_id": "1105",
    "municipality": "Cascais",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M58.29 360.83 L58.28 360.83 L58.3 360.82 L58.3 360.83 L58.29 360.83 Z M58.29 357.83 L58.26 357.85 L58.24 357.84 L58.3 357.8 L58.29 357.83 Z M58.18 357.8 L58.18 357.79 L58.19 357.79 L58.18 357.8 Z M58.13 357.71 L58.14 357.71 L58.14 357.72 L58.13 357.71 Z M58.17 357.7 L58.17 357.71 L58.17 357.7 Z M58.18 357.7 L58.19 357.69 L58.18 357.71 L58.18 357.7 Z M58.15 357.7 L58.14 357.69 L58.15 357.69 L58.15 357.7 Z M58.2 357.68 L58.2 357.67 L58.21 357.67 L58.2 357.7 L58.2 357.68 Z M58.09 357.69 L58.11 357.63 L58.13 357.62 L58.13 357.67 L58.09 357.69 Z M57.88 357.56 L57.87 357.59 L57.84 357.59 L57.86 357.54 L57.88 357.56 Z M57.96 357.54 L57.96 357.53 L57.97 357.52 L57.97 357.56 L57.96 357.54 Z M57.88 357.53 L57.89 357.52 L57.89 357.54 L57.88 357.53 Z M57.91 357.52 L57.9 357.52 L57.91 357.52 Z M57.89 357.47 L57.91 357.46 L57.91 357.48 L57.9 357.47 L57.89 357.47 Z M58.31 360.84 Z M58.3 360.83 L58.31 360.82 L58.31 360.83 L58.3 360.83 Z M58.45 360.49 L58.41 360.49 L58.39 360.49 L58.43 360.48 L58.45 360.49 Z M58.4 360.46 L58.39 360.46 L58.41 360.46 L58.4 360.46 Z M58.59 359.31 L58.59 359.3 L58.6 359.3 L58.6 359.32 L58.59 359.31 Z M58.58 359.3 L58.58 359.29 L58.59 359.3 L58.58 359.31 L58.58 359.3 Z M58.63 359.24 L58.62 359.24 L58.62 359.23 L58.63 359.22 L58.63 359.24 Z M58.51 357.99 L58.52 357.99 L58.52 358.0 L58.51 357.99 Z M58.48 357.97 L58.49 357.94 L58.51 357.94 L58.49 357.97 L58.48 357.97 Z M58.47 357.95 L58.48 357.95 L58.47 357.96 L58.47 357.95 Z M58.34 357.85 L58.33 357.86 L58.33 357.85 L58.34 357.85 Z M58.33 357.85 L58.32 357.83 L58.34 357.82 L58.34 357.84 L58.33 357.85 Z M58.35 357.84 L58.35 357.82 L58.37 357.82 L58.37 357.84 L58.35 357.84 Z M58.31 357.8 L58.31 357.81 L58.31 357.8 Z M71.01 363.39 L70.45 363.99 L70.97 365.72 L70.61 366.28 L65.29 363.45 L59.65 364.11 L57.81 357.51 L61.36 356.34 L67.78 359.63 L70.53 358.24 L71.01 363.39 Z M58.69 359.22 L58.68 359.21 L58.7 359.22 L58.7 359.23 L58.69 359.22 Z M58.67 358.89 L58.66 358.89 L58.66 358.88 L58.67 358.89 Z M58.68 358.84 L58.69 358.84 L58.68 358.84 Z M58.67 358.83 L58.68 358.83 L58.67 358.84 L58.67 358.83 Z M58.65 358.76 L58.66 358.74 L58.67 358.76 L58.65 358.76 Z M58.67 358.74 L58.68 358.73 L58.69 358.73 L58.68 358.74 L58.67 358.74 Z M58.69 358.72 L58.69 358.73 L58.69 358.72 Z M58.63 358.13 L58.64 358.14 L58.62 358.13 L58.63 358.13 Z M58.66 358.12 L58.64 358.11 L58.63 358.11 L58.67 358.11 L58.66 358.12 Z M58.65 358.08 L58.65 358.09 L58.64 358.09 L58.65 358.08 Z"
  },
  {
    "municipality_id": "1106",
    "municipality": "Lisboa",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M84.94 364.48 L78.01 365.67 L81.82 356.25 L85.42 353.81 L89.59 356.03 L90.67 353.83 L89.48 361.34 L84.94 364.48 Z"
  },
  {
    "municipality_id": "1107",
    "municipality": "Loures",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M89.53 355.5 L78.49 350.41 L79.06 341.07 L82.25 342.44 L87.03 338.53 L92.05 340.85 L88.18 343.76 L88.07 349.28 L90.7 347.02 L92.17 349.0 L89.53 355.5 Z"
  },
  {
    "municipality_id": "1108",
    "municipality": "Lourinhã",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M75.4 311.79 L72.24 313.71 L69.33 311.86 L70.19 301.58 L73.95 302.24 L77.38 298.67 L81.88 300.35 L83.77 311.11 L78.58 309.41 L75.4 311.79 Z"
  },
  {
    "municipality_id": "1109",
    "municipality": "Mafra",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M73.58 344.18 L69.39 344.39 L63.35 339.12 L64.7 325.6 L69.18 326.49 L72.64 331.57 L73.45 328.97 L77.93 331.6 L80.24 330.2 L81.13 335.24 L78.14 337.63 L84.58 337.11 L82.25 342.44 L79.06 341.07 L78.76 346.61 L73.58 344.18 Z"
  },
  {
    "municipality_id": "1116",
    "municipality": "Odivelas",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M80.34 356.25 L77.93 351.2 L79.42 350.08 L85.42 353.81 L80.34 356.25 Z"
  },
  {
    "municipality_id": "1110",
    "municipality": "Oeiras",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M79.55 362.08 L78.99 364.1 L78.63 364.43 L70.64 366.44 L72.28 358.41 L79.55 362.08 Z"
  },
  {
    "municipality_id": "1111",
    "municipality": "Sintra",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M72.48 358.39 L67.78 359.63 L56.89 356.33 L63.35 339.12 L69.39 344.39 L75.47 343.35 L78.06 345.73 L79.58 353.46 L77.29 359.3 L72.48 358.39 Z"
  },
  {
    "municipality_id": "1112",
    "municipality": "Sobral de Monte Agraço",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M78.14 337.62 L81.13 335.26 L81.14 330.66 L89.77 329.55 L89.1 333.94 L88.33 332.37 L85.46 335.6 L83.72 334.07 L84.36 336.89 L78.14 337.62 Z"
  },
  {
    "municipality_id": "1113",
    "municipality": "Torres Vedras",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M70.1 330.28 L69.18 326.49 L64.08 326.46 L63.37 324.26 L69.33 311.86 L72.38 313.69 L81.74 309.65 L85.41 312.51 L86.97 318.36 L84.64 321.05 L87.63 328.52 L82.03 331.81 L73.55 328.95 L72.64 331.57 L70.1 330.28 Z"
  },
  {
    "municipality_id": "1114",
    "municipality": "Vila Franca de Xira",
    "district": "Lisboa",
    "districtDisplay": "Lisboa",
    "district_id": "11",
    "path": "M91.97 348.86 L90.7 347.02 L88.07 349.28 L88.18 343.76 L92.09 342.34 L90.18 335.8 L95.85 336.59 L95.85 330.58 L102.9 332.38 L105.29 329.52 L105.48 331.81 L107.97 331.19 L107.1 329.16 L110.98 330.53 L107.99 335.38 L110.25 336.74 L106.89 338.34 L98.13 354.21 L95.77 347.12 L90.67 353.83 L91.97 348.86 Z"
  },
  {
    "municipality_id": "1201",
    "municipality": "Alter do Chão",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M192.14 310.15 L190.41 303.27 L195.13 297.78 L218.35 311.5 L219.38 314.79 L209.24 317.17 L207.33 320.43 L197.52 318.62 L192.14 310.15 Z"
  },
  {
    "municipality_id": "1202",
    "municipality": "Arronches",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M237.99 327.47 L231.92 322.71 L233.41 319.92 L230.36 317.07 L234.05 313.83 L232.38 311.86 L242.5 310.42 L251.3 314.24 L250.41 325.15 L252.96 330.46 L250.37 331.61 L242.13 326.42 L237.99 327.47 Z"
  },
  {
    "municipality_id": "1203",
    "municipality": "Avis",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M192.07 332.57 L178.48 338.99 L179.16 334.7 L176.37 331.87 L173.77 331.29 L171.8 336.0 L171.75 330.35 L167.78 329.91 L176.14 319.87 L183.96 319.57 L184.4 314.05 L189.42 309.66 L194.79 311.46 L193.74 315.18 L196.79 314.68 L198.97 320.79 L203.33 323.06 L202.8 327.52 L205.23 328.05 L203.52 332.4 L192.07 332.57 Z"
  },
  {
    "municipality_id": "1204",
    "municipality": "Campo Maior",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M265.42 327.44 L266.57 329.63 L260.42 340.32 L257.12 341.65 L250.3 332.15 L253.46 328.13 L250.44 325.24 L250.61 320.85 L259.85 319.86 L265.42 327.44 Z"
  },
  {
    "municipality_id": "1205",
    "municipality": "Castelo de Vide",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M230.09 279.51 L228.28 290.18 L213.41 292.83 L215.63 275.4 L222.61 277.09 L222.2 270.95 L229.97 276.63 L230.09 279.51 Z"
  },
  {
    "municipality_id": "1206",
    "municipality": "Crato",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M210.57 291.44 L220.73 297.76 L220.04 305.0 L217.58 305.77 L223.67 313.84 L209.13 307.84 L198.55 298.42 L188.32 297.49 L204.05 292.17 L206.86 286.43 L210.57 291.44 Z"
  },
  {
    "municipality_id": "1207",
    "municipality": "Elvas",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M244.09 356.93 L245.69 350.17 L242.6 348.45 L233.55 353.79 L230.53 353.45 L227.79 348.55 L229.85 342.95 L233.47 341.73 L234.48 331.57 L239.38 326.57 L250.14 330.23 L260.02 344.98 L246.09 358.56 L244.09 356.93 Z"
  },
  {
    "municipality_id": "1208",
    "municipality": "Fronteira",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M219.3 326.29 L217.98 333.23 L213.95 331.23 L210.08 333.62 L203.97 330.31 L203.33 323.06 L198.97 320.79 L199.27 318.34 L207.35 320.43 L209.24 317.17 L216.95 315.0 L219.3 326.29 Z"
  },
  {
    "municipality_id": "1209",
    "municipality": "Gavião",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M182.8 292.4 L184.96 288.58 L179.49 282.83 L179.81 280.32 L181.7 278.32 L182.65 274.86 L183.9 273.13 L192.35 278.74 L190.94 282.72 L201.05 289.37 L199.15 292.8 L188.32 297.49 L182.8 292.4 Z"
  },
  {
    "municipality_id": "1210",
    "municipality": "Marvão",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M226.69 291.19 L228.61 280.93 L237.8 284.05 L236.9 296.91 L233.12 299.34 L227.99 297.01 L226.69 291.19 Z"
  },
  {
    "municipality_id": "1211",
    "municipality": "Monforte",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M224.33 340.3 L225.34 336.29 L218.21 331.23 L220.41 327.97 L215.74 317.51 L219.52 312.47 L231.08 317.48 L233.41 319.92 L231.92 322.71 L238.01 327.47 L230.55 345.19 L227.98 346.76 L227.86 342.7 L224.33 340.3 Z"
  },
  {
    "municipality_id": "1212",
    "municipality": "Nisa",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M206.84 286.46 L204.07 292.16 L199.75 292.27 L201.05 289.37 L189.89 280.56 L202.8 270.16 L204.34 265.55 L206.95 264.22 L209.77 266.96 L218.33 262.74 L222.63 277.06 L215.63 275.4 L213.41 292.83 L206.84 286.46 Z"
  },
  {
    "municipality_id": "1213",
    "municipality": "Ponte de Sor",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M167.71 330.0 L162.27 335.04 L158.87 331.44 L156.37 324.25 L152.03 322.07 L155.73 315.56 L165.19 309.69 L169.23 302.44 L173.81 303.43 L181.03 292.35 L189.24 298.33 L194.48 297.98 L194.17 301.48 L190.41 303.27 L192.15 310.19 L185.59 312.54 L183.65 319.82 L174.86 320.73 L167.71 330.0 Z"
  },
  {
    "municipality_id": "1214",
    "municipality": "Portalegre",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M230.33 317.07 L223.67 313.84 L217.58 305.77 L220.03 305.01 L221.14 299.04 L217.14 292.42 L225.84 290.48 L228.0 297.02 L232.86 299.47 L236.69 296.78 L243.24 303.03 L242.09 311.1 L232.4 311.84 L234.05 313.83 L230.33 317.07 Z"
  },
  {
    "municipality_id": "1215",
    "municipality": "Sousel",
    "district": "Portalegre",
    "districtDisplay": "Portalegre",
    "district_id": "12",
    "path": "M189.25 340.23 L187.32 336.83 L188.85 332.25 L191.49 334.03 L192.66 331.06 L195.6 333.62 L204.34 330.31 L210.08 333.62 L213.95 331.23 L218.18 334.53 L210.16 341.97 L202.3 339.09 L197.62 343.68 L189.25 340.23 Z"
  },
  {
    "municipality_id": "1301",
    "municipality": "Amarante",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M173.54 97.96 L167.0 98.37 L169.02 94.46 L165.91 97.19 L162.76 95.91 L163.24 92.62 L170.23 88.18 L170.74 85.25 L177.75 88.08 L181.97 82.2 L188.23 95.78 L183.4 101.23 L181.03 98.55 L176.66 101.8 L173.54 97.96 Z"
  },
  {
    "municipality_id": "1302",
    "municipality": "Baião",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M178.82 110.78 L173.36 112.11 L170.89 107.6 L177.8 100.58 L181.03 98.55 L184.4 100.95 L189.21 95.62 L186.99 109.12 L178.82 110.78 Z"
  },
  {
    "municipality_id": "1303",
    "municipality": "Felgueiras",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M161.54 89.66 L157.76 88.49 L157.82 82.85 L165.17 78.54 L171.2 86.83 L164.63 90.75 L161.54 89.66 Z"
  },
  {
    "municipality_id": "1304",
    "municipality": "Gondomar",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M149.1 121.48 L134.58 108.39 L134.01 100.97 L137.93 100.27 L145.05 112.58 L149.7 113.32 L149.1 121.48 Z"
  },
  {
    "municipality_id": "1305",
    "municipality": "Lousada",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M155.28 96.49 L152.9 86.43 L154.76 84.72 L164.69 91.08 L162.76 95.91 L155.28 96.49 Z"
  },
  {
    "municipality_id": "1306",
    "municipality": "Maia",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M132.38 102.0 L130.71 97.98 L124.79 96.62 L125.25 94.36 L130.46 90.52 L134.76 94.56 L138.9 91.51 L136.65 97.22 L134.49 96.34 L135.69 100.86 L132.38 102.0 Z"
  },
  {
    "municipality_id": "1307",
    "municipality": "Marco de Canaveses",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M157.16 113.61 L164.69 104.3 L161.5 100.12 L166.32 98.63 L168.1 94.67 L169.41 95.22 L167.14 97.31 L166.75 98.15 L166.97 98.35 L173.54 97.96 L176.49 100.8 L170.89 107.6 L170.59 112.41 L157.16 113.61 Z"
  },
  {
    "municipality_id": "1308",
    "municipality": "Matosinhos",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M131.23 99.95 L132.37 102.31 L123.49 103.43 L121.94 93.11 L131.23 99.95 Z"
  },
  {
    "municipality_id": "1310",
    "municipality": "Paredes",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M142.22 107.54 L144.71 104.09 L144.19 96.14 L155.18 95.42 L156.33 97.57 L148.64 108.39 L150.5 114.56 L147.01 111.44 L145.05 112.58 L142.22 107.54 Z"
  },
  {
    "municipality_id": "1309",
    "municipality": "Paços de Ferreira",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M150.28 94.56 L143.93 96.07 L148.53 86.58 L152.89 86.41 L153.42 95.09 L150.28 94.56 Z"
  },
  {
    "municipality_id": "1311",
    "municipality": "Penafiel",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M153.64 115.85 L149.6 116.13 L149.64 105.36 L157.89 95.62 L166.12 97.12 L161.13 101.11 L164.43 104.87 L153.64 115.85 Z"
  },
  {
    "municipality_id": "1312",
    "municipality": "Porto",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M129.28 106.22 L125.8 106.36 L124.93 103.35 L131.79 102.07 L135.89 105.02 L129.28 106.22 Z"
  },
  {
    "municipality_id": "1313",
    "municipality": "Póvoa de Varzim",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M120.71 82.38 L118.56 82.51 L117.32 78.11 L118.29 71.81 L132.99 79.49 L130.38 81.3 L124.17 76.73 L122.55 82.81 L120.71 82.38 Z"
  },
  {
    "municipality_id": "1314",
    "municipality": "Santo Tirso",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M143.59 95.93 L139.13 95.41 L138.88 84.16 L154.0 82.02 L154.58 85.16 L148.53 86.58 L143.59 95.93 Z"
  },
  {
    "municipality_id": "1318",
    "municipality": "Trofa",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M139.28 88.39 L134.76 94.56 L129.46 87.96 L130.47 85.55 L136.18 85.01 L139.55 85.42 L139.28 88.39 Z"
  },
  {
    "municipality_id": "1315",
    "municipality": "Valongo",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M143.52 101.48 L144.71 104.09 L140.53 106.35 L134.49 96.34 L136.65 97.22 L138.52 93.34 L140.44 96.61 L144.89 95.96 L143.52 101.48 Z"
  },
  {
    "municipality_id": "1317",
    "municipality": "Vila Nova de Gaia",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M130.92 119.37 L128.44 119.99 L126.08 106.41 L133.86 106.73 L138.94 114.06 L144.13 116.1 L141.14 116.17 L142.69 118.55 L139.92 120.74 L137.76 117.44 L135.45 120.07 L130.92 119.37 Z"
  },
  {
    "municipality_id": "1316",
    "municipality": "Vila do Conde",
    "district": "Porto",
    "districtDisplay": "Porto",
    "district_id": "13",
    "path": "M124.99 94.69 L121.92 93.11 L118.88 82.36 L122.55 82.81 L124.17 76.73 L128.44 78.83 L131.37 85.7 L130.2 91.58 L124.99 94.69 Z"
  },
  {
    "municipality_id": "1401",
    "municipality": "Abrantes",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M160.5 293.44 L155.87 284.06 L157.16 279.81 L151.17 277.86 L160.5 270.22 L158.36 268.84 L161.26 264.56 L166.83 266.67 L165.06 277.59 L169.57 280.28 L173.33 275.21 L174.94 283.03 L179.49 282.84 L185.18 289.49 L177.7 294.39 L173.81 303.43 L169.24 302.42 L166.1 308.14 L157.13 297.85 L160.5 293.44 Z"
  },
  {
    "municipality_id": "1402",
    "municipality": "Alcanena",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M123.17 290.48 L117.72 289.85 L121.76 286.01 L118.1 282.45 L120.64 281.85 L119.63 276.25 L121.85 277.67 L125.47 273.3 L128.21 276.12 L125.2 278.95 L129.79 283.25 L128.23 288.49 L123.17 290.48 Z"
  },
  {
    "municipality_id": "1403",
    "municipality": "Almeirim",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M142.6 314.81 L144.22 316.09 L141.0 320.66 L143.02 321.56 L140.34 322.49 L132.35 322.95 L128.97 319.18 L121.81 318.61 L125.26 308.08 L128.26 306.9 L134.66 314.58 L138.1 310.94 L142.6 314.81 Z"
  },
  {
    "municipality_id": "1404",
    "municipality": "Alpiarça",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M132.47 300.7 L139.84 307.49 L134.66 314.58 L128.26 306.9 L132.47 300.7 Z"
  },
  {
    "municipality_id": "1405",
    "municipality": "Benavente",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M122.05 349.02 L118.09 359.69 L114.95 360.59 L111.03 357.64 L105.13 360.64 L100.43 350.59 L106.89 338.34 L110.25 336.74 L107.98 335.47 L111.04 330.77 L109.51 329.46 L114.07 329.33 L115.46 332.81 L120.55 334.91 L121.19 339.42 L125.91 341.84 L125.11 351.43 L122.05 349.02 Z"
  },
  {
    "municipality_id": "1406",
    "municipality": "Cartaxo",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M114.71 322.43 L105.32 314.06 L115.39 310.32 L119.81 314.32 L121.62 311.33 L122.48 314.8 L124.22 312.81 L117.67 325.7 L114.71 322.43 Z"
  },
  {
    "municipality_id": "1407",
    "municipality": "Chamusca",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M159.89 313.55 L147.33 325.21 L146.01 321.98 L141.0 320.66 L144.21 315.86 L138.11 310.94 L139.84 307.49 L132.68 300.46 L142.18 292.88 L144.78 284.87 L152.54 284.05 L158.82 301.93 L166.1 308.14 L159.89 313.55 Z"
  },
  {
    "municipality_id": "1408",
    "municipality": "Constância",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M158.83 289.4 L160.5 293.44 L157.62 297.16 L152.05 283.81 L153.26 279.63 L157.16 279.81 L155.87 284.06 L158.83 289.4 Z"
  },
  {
    "municipality_id": "1409",
    "municipality": "Coruche",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M147.37 325.17 L152.05 322.15 L156.37 324.25 L162.24 333.67 L157.88 342.5 L167.22 346.84 L164.82 349.82 L170.06 353.31 L168.6 356.73 L155.45 346.54 L154.73 349.08 L149.19 347.87 L146.57 351.38 L144.83 350.18 L141.44 354.43 L139.03 352.99 L135.07 357.69 L129.74 355.58 L131.15 349.39 L127.57 352.74 L125.14 351.56 L126.51 343.15 L120.22 338.38 L121.87 334.97 L129.52 333.13 L132.96 329.01 L131.37 324.43 L133.29 321.96 L145.86 321.9 L147.37 325.17 Z"
  },
  {
    "municipality_id": "1410",
    "municipality": "Entroncamento",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M142.91 280.96 L142.44 284.82 L140.56 286.34 L139.47 283.31 L142.91 280.96 Z"
  },
  {
    "municipality_id": "1411",
    "municipality": "Ferreira do Zêzere",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M160.87 257.69 L160.91 264.79 L155.37 261.09 L153.35 264.61 L153.0 259.39 L145.14 260.28 L145.06 254.59 L153.38 252.36 L152.85 248.0 L156.54 248.63 L161.28 252.29 L160.87 257.69 Z"
  },
  {
    "municipality_id": "1412",
    "municipality": "Golegã",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M134.57 299.13 L131.81 297.48 L134.66 290.64 L144.59 284.28 L142.18 292.88 L134.57 299.13 Z"
  },
  {
    "municipality_id": "1413",
    "municipality": "Mação",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M180.55 282.12 L174.94 283.03 L171.36 268.06 L175.82 267.72 L173.76 263.45 L177.11 253.87 L183.61 254.58 L183.64 262.98 L187.13 262.22 L191.25 265.41 L195.8 273.03 L192.38 278.94 L183.88 273.14 L180.55 282.12 Z"
  },
  {
    "municipality_id": "1421",
    "municipality": "Ourém",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M130.81 274.12 L128.21 276.12 L124.21 271.92 L122.95 265.11 L128.68 259.28 L124.85 257.85 L124.83 251.47 L132.58 250.45 L141.3 244.23 L145.67 261.06 L142.46 258.06 L139.89 259.78 L139.12 266.02 L130.81 274.12 Z"
  },
  {
    "municipality_id": "1414",
    "municipality": "Rio Maior",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M112.97 303.8 L112.1 306.58 L105.49 307.7 L99.58 305.68 L98.23 294.99 L106.36 283.33 L108.57 288.04 L106.64 290.75 L115.57 295.52 L112.96 300.34 L116.05 305.01 L112.97 303.8 Z"
  },
  {
    "municipality_id": "1415",
    "municipality": "Salvaterra de Magos",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M132.25 326.62 L129.52 333.13 L121.3 336.63 L113.4 330.87 L121.81 318.61 L130.64 319.93 L132.25 326.62 Z"
  },
  {
    "municipality_id": "1416",
    "municipality": "Santarém",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M121.55 311.37 L119.81 314.32 L116.94 310.23 L113.0 311.68 L108.68 306.89 L112.31 306.42 L112.99 303.72 L115.06 305.07 L116.05 305.01 L112.96 300.34 L115.57 295.52 L106.64 290.75 L108.17 282.47 L120.15 283.87 L121.69 286.39 L118.27 290.47 L129.06 286.92 L134.66 290.63 L131.82 297.45 L133.83 299.28 L125.33 307.96 L122.48 314.8 L121.55 311.37 Z"
  },
  {
    "municipality_id": "1417",
    "municipality": "Sardoal",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M169.53 280.28 L164.4 276.05 L166.83 266.67 L173.55 270.76 L169.53 280.28 Z"
  },
  {
    "municipality_id": "1418",
    "municipality": "Tomar",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M141.84 273.51 L138.4 264.32 L142.37 258.05 L145.1 261.67 L145.68 259.59 L153.0 259.39 L153.34 264.6 L155.37 261.09 L160.91 264.79 L158.36 268.84 L160.5 270.22 L151.51 277.24 L149.08 282.43 L140.09 275.4 L141.84 273.51 Z"
  },
  {
    "municipality_id": "1419",
    "municipality": "Torres Novas",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M139.5 283.98 L138.93 289.12 L131.76 290.03 L128.88 287.04 L129.79 283.25 L125.2 278.95 L139.12 266.02 L142.33 272.96 L140.09 275.4 L143.38 279.26 L139.5 283.98 Z"
  },
  {
    "municipality_id": "1420",
    "municipality": "Vila Nova da Barquinha",
    "district": "Santarem",
    "districtDisplay": "Santarém",
    "district_id": "14",
    "path": "M147.62 284.46 L141.97 285.55 L143.38 279.27 L148.98 282.45 L151.03 277.84 L153.46 278.69 L152.05 283.81 L147.62 284.46 Z"
  },
  {
    "municipality_id": "1502",
    "municipality": "Alcochete",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M95.75 360.82 L96.25 358.09 L98.85 358.68 L101.59 357.74 L96.9 357.19 L101.61 355.17 L98.77 354.37 L100.55 350.77 L105.15 360.67 L111.03 357.64 L113.41 359.95 L110.96 366.36 L105.0 367.13 L103.51 362.4 L95.75 360.82 Z"
  },
  {
    "municipality_id": "1501",
    "municipality": "Alcácer do Sal",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M148.44 418.8 L141.79 410.65 L137.9 412.61 L130.06 410.21 L129.24 406.23 L116.56 404.94 L112.56 389.03 L117.89 388.41 L118.94 384.02 L125.94 380.26 L132.72 380.33 L136.56 384.23 L138.58 380.4 L140.94 383.65 L149.79 380.62 L154.64 389.84 L153.58 392.12 L156.78 393.31 L153.61 398.94 L166.99 404.68 L169.61 414.58 L160.59 419.04 L157.46 415.37 L155.3 418.42 L148.44 418.8 Z"
  },
  {
    "municipality_id": "1503",
    "municipality": "Almada",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M83.7 370.09 L84.59 377.23 L82.0 379.67 L75.92 367.74 L85.59 365.14 L86.99 368.63 L83.7 370.09 Z"
  },
  {
    "municipality_id": "1504",
    "municipality": "Barreiro",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M95.34 376.89 L89.81 368.72 L95.0 365.06 L93.53 370.06 L97.83 375.32 L95.34 376.89 Z"
  },
  {
    "municipality_id": "1505",
    "municipality": "Grândola",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M160.56 419.07 L156.75 418.51 L156.18 423.56 L152.64 421.81 L150.15 427.22 L148.04 426.03 L144.16 435.68 L127.79 428.6 L125.73 424.69 L121.98 427.54 L113.99 425.2 L114.98 402.4 L104.72 384.94 L112.56 389.03 L116.63 404.99 L129.24 406.23 L130.06 410.21 L137.9 412.61 L141.79 410.65 L148.8 419.09 L155.3 418.42 L157.46 415.37 L160.56 419.07 Z"
  },
  {
    "municipality_id": "1506",
    "municipality": "Moita",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M99.64 366.63 L101.62 372.46 L99.33 370.8 L99.46 373.74 L96.57 374.45 L93.93 366.34 L98.86 364.39 L99.64 366.63 Z"
  },
  {
    "municipality_id": "1507",
    "municipality": "Montijo",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M102.31 368.27 L99.92 368.73 L98.86 364.39 L93.98 365.71 L94.08 362.24 L103.51 362.4 L105.07 368.35 L102.31 368.27 Z M130.51 370.01 L125.47 369.79 L119.99 365.19 L115.92 367.42 L116.25 364.74 L121.76 361.94 L117.02 360.21 L121.92 348.9 L126.86 352.72 L131.15 349.39 L130.2 356.12 L139.79 357.86 L138.94 362.69 L130.51 370.01 Z"
  },
  {
    "municipality_id": "1508",
    "municipality": "Palmela",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M113.92 379.45 L107.72 378.61 L101.54 381.8 L95.43 376.88 L99.46 373.74 L99.16 370.89 L101.57 372.55 L102.22 368.29 L110.96 366.36 L114.07 359.79 L121.76 361.94 L116.25 364.74 L115.92 367.42 L119.99 365.19 L129.7 370.11 L125.87 374.42 L127.43 380.14 L122.09 383.38 L118.56 383.44 L118.72 377.23 L113.92 379.45 Z"
  },
  {
    "municipality_id": "1509",
    "municipality": "Santiago do Cacém",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M133.12 457.25 L131.33 463.75 L128.8 464.5 L123.05 463.96 L119.04 458.04 L119.91 451.29 L123.53 447.59 L115.48 439.3 L115.37 435.76 L112.08 436.58 L114.06 425.2 L121.98 427.54 L125.73 424.69 L127.79 428.6 L142.35 435.61 L145.49 434.92 L146.44 431.16 L155.94 438.89 L152.81 454.31 L144.13 451.77 L135.52 453.59 L133.12 457.25 Z"
  },
  {
    "municipality_id": "1510",
    "municipality": "Seixal",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M93.39 376.36 L92.0 380.79 L91.45 378.49 L84.59 377.23 L83.62 370.16 L91.15 369.24 L93.39 376.36 Z"
  },
  {
    "municipality_id": "1511",
    "municipality": "Sesimbra",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M81.11 394.52 L81.12 394.52 L81.11 394.52 Z M81.72 394.07 L81.73 394.06 L81.74 394.06 L81.73 394.07 L81.72 394.07 Z M86.27 392.44 L86.28 392.45 L86.27 392.45 L86.27 392.44 Z M86.86 392.22 L86.85 392.21 L86.87 392.22 L86.86 392.22 Z M87.07 392.21 L87.08 392.21 L87.08 392.22 L87.07 392.21 Z M86.86 392.21 L86.87 392.19 L86.9 392.2 L86.89 392.21 L86.86 392.21 Z M86.61 392.21 L86.6 392.2 L86.6 392.18 L86.62 392.21 L86.61 392.21 Z M87.03 392.2 L87.05 392.18 L87.07 392.2 L87.05 392.2 L87.03 392.2 Z M86.88 392.18 L86.86 392.18 L86.86 392.17 L86.89 392.18 L86.88 392.18 Z M87.13 392.15 L87.14 392.15 L87.14 392.16 L87.13 392.16 L87.13 392.15 Z M89.57 391.48 L89.58 391.47 L89.59 391.47 L89.59 391.49 L89.57 391.48 Z M90.33 391.63 L78.92 394.02 L82.44 378.25 L87.33 377.07 L92.0 380.79 L93.38 376.31 L92.92 385.46 L95.99 389.96 L90.33 391.63 Z M91.79 391.95 L91.78 391.98 L91.77 391.98 L91.78 391.94 L91.79 391.95 Z M91.77 391.92 L91.77 391.91 L91.78 391.92 L91.77 391.92 Z M91.18 391.86 L91.19 391.85 L91.19 391.86 L91.18 391.86 Z M91.14 391.85 L91.15 391.84 L91.16 391.85 L91.15 391.86 L91.14 391.85 Z M91.12 391.82 L91.13 391.82 L91.12 391.82 Z M90.81 391.81 L90.82 391.8 L90.83 391.82 L90.82 391.82 L90.81 391.81 Z M90.7 391.81 L90.7 391.8 L90.71 391.8 L90.71 391.81 L90.7 391.81 Z M90.94 391.8 L90.95 391.8 L90.96 391.8 L90.95 391.81 L90.94 391.8 Z M90.92 391.8 L90.93 391.8 L90.93 391.81 L90.92 391.8 Z M91.05 391.8 L91.06 391.8 L91.07 391.8 L91.06 391.81 L91.05 391.8 Z M89.69 391.46 L89.63 391.46 L89.62 391.43 L89.66 391.43 L89.69 391.46 Z M95.37 390.44 L95.38 390.44 L95.39 390.45 L95.38 390.45 L95.37 390.44 Z"
  },
  {
    "municipality_id": "1512",
    "municipality": "Setúbal",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M97.87 389.15 L97.86 389.14 L97.88 389.13 L97.88 389.14 L97.87 389.15 Z M99.8 387.46 L99.78 387.5 L99.69 387.53 L99.73 387.43 L99.8 387.46 Z M118.54 383.09 L119.76 385.56 L115.25 389.28 L104.28 384.05 L96.02 389.98 L92.89 385.2 L94.75 376.6 L101.54 381.8 L118.72 377.23 L118.54 383.09 Z"
  },
  {
    "municipality_id": "1513",
    "municipality": "Sines",
    "district": "Setubal",
    "districtDisplay": "Setúbal",
    "district_id": "15",
    "path": "M106.27 442.42 L106.27 442.41 L106.28 442.41 L106.28 442.42 L106.27 442.42 Z M106.26 442.39 L106.25 442.43 L106.2 442.41 L106.22 442.39 L106.26 442.39 Z M106.28 442.41 L106.28 442.4 L106.28 442.41 Z M106.14 442.37 L106.18 442.38 L106.19 442.4 L106.1 442.38 L106.14 442.37 Z M106.28 442.38 L106.29 442.37 L106.29 442.38 L106.28 442.38 Z M106.27 442.35 L106.27 442.34 L106.28 442.34 L106.28 442.35 L106.27 442.35 Z M106.27 442.34 L106.27 442.33 L106.27 442.34 Z M106.39 442.3 L106.4 442.3 L106.39 442.3 Z M106.32 442.28 L106.31 442.28 L106.31 442.27 L106.33 442.28 L106.32 442.28 Z M106.43 442.26 L106.43 442.27 L106.43 442.26 Z M106.36 442.05 L106.39 442.06 L106.38 442.08 L106.33 442.06 L106.36 442.05 Z M106.27 442.0 L106.3 442.03 L106.23 442.0 L106.26 442.0 L106.27 442.0 Z M106.56 441.83 L106.58 441.88 L106.53 441.93 L106.51 441.89 L106.56 441.83 Z M113.85 455.51 L113.74 455.72 L113.58 455.47 L113.78 455.36 L113.85 455.51 Z M118.89 457.57 L114.15 457.03 L112.78 445.55 L106.18 444.14 L111.59 432.78 L112.08 436.58 L115.37 435.76 L115.48 439.3 L123.08 445.53 L119.91 451.29 L120.78 457.9 L118.89 457.57 Z M106.58 441.87 L106.59 441.86 L106.6 441.86 L106.59 441.87 L106.58 441.87 Z M106.67 441.81 L106.66 441.82 L106.64 441.83 L106.65 441.81 L106.67 441.81 Z M106.66 441.8 L106.68 441.8 L106.64 441.81 L106.64 441.79 L106.66 441.8 Z M106.87 441.62 L106.86 441.61 L106.86 441.59 L106.88 441.61 L106.87 441.62 Z M106.92 441.54 L106.92 441.52 L106.94 441.53 L106.94 441.54 L106.92 441.54 Z M107.53 441.26 L107.53 441.25 L107.54 441.25 L107.55 441.26 L107.53 441.26 Z M107.86 440.71 L107.87 440.71 L107.86 440.71 Z M107.88 440.71 L107.88 440.72 L107.87 440.72 L107.88 440.7 L107.89 440.7 L107.88 440.71 Z M107.85 440.69 L107.87 440.7 L107.86 440.7 L107.87 440.72 L107.84 440.69 L107.85 440.69 Z M107.87 440.7 L107.87 440.69 L107.88 440.7 L107.87 440.7 Z"
  },
  {
    "municipality_id": "1601",
    "municipality": "Arcos de Valdevez",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M141.52 38.12 L139.05 38.01 L137.94 34.13 L141.32 26.62 L140.88 19.81 L153.8 16.65 L157.85 19.15 L159.99 15.03 L164.55 14.45 L164.08 29.63 L157.47 31.31 L153.38 35.82 L141.52 38.12 Z"
  },
  {
    "municipality_id": "1602",
    "municipality": "Caminha",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M113.94 37.02 L113.21 39.19 L110.74 37.38 L111.1 30.39 L115.81 25.25 L126.97 32.32 L125.36 35.75 L121.13 34.08 L120.18 37.61 L113.94 37.02 Z M110.9 30.78 L110.89 30.94 L110.78 30.95 L110.78 30.81 L110.9 30.78 Z"
  },
  {
    "municipality_id": "1603",
    "municipality": "Melgaço",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M156.76 17.06 L152.9 7.65 L164.18 0.0 L165.48 9.41 L172.21 8.66 L173.04 14.54 L166.98 18.11 L163.26 24.34 L164.55 14.45 L159.99 15.03 L157.85 19.15 L156.76 17.06 Z"
  },
  {
    "municipality_id": "1604",
    "municipality": "Monção",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M137.63 17.79 L138.42 8.08 L151.31 6.71 L157.03 16.18 L141.6 19.84 L137.63 17.79 Z"
  },
  {
    "municipality_id": "1605",
    "municipality": "Paredes de Coura",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M129.46 31.55 L126.58 28.0 L129.64 23.22 L136.08 18.04 L140.88 19.81 L141.32 26.62 L138.57 31.57 L129.46 31.55 Z"
  },
  {
    "municipality_id": "1606",
    "municipality": "Ponte da Barca",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M146.31 41.87 L142.31 43.68 L142.51 37.19 L152.72 36.05 L157.5 31.29 L166.48 29.31 L166.63 36.59 L155.62 41.47 L146.31 41.87 Z"
  },
  {
    "municipality_id": "1607",
    "municipality": "Ponte de Lima",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M128.97 52.32 L125.33 35.84 L127.95 31.15 L130.76 32.6 L135.54 29.89 L138.57 31.53 L139.05 38.01 L142.57 38.57 L143.38 44.48 L138.88 45.11 L137.07 55.11 L128.97 52.32 Z"
  },
  {
    "municipality_id": "1608",
    "municipality": "Valença",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M129.48 23.46 L126.14 17.32 L128.13 12.89 L136.8 10.51 L137.61 18.94 L129.48 23.46 Z"
  },
  {
    "municipality_id": "1609",
    "municipality": "Viana do Castelo",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M117.95 56.88 L115.61 57.06 L110.94 44.88 L110.82 37.57 L120.18 37.61 L121.13 34.08 L125.36 35.75 L128.71 54.91 L117.95 56.88 Z"
  },
  {
    "municipality_id": "1610",
    "municipality": "Vila Nova de Cerveira",
    "district": "Viana do Castelo",
    "districtDisplay": "Viana do Castelo",
    "district_id": "16",
    "path": "M127.92 31.19 L122.68 30.47 L117.9 24.81 L125.74 17.14 L129.46 23.85 L126.58 28.0 L127.92 31.19 Z"
  },
  {
    "municipality_id": "1701",
    "municipality": "Alijó",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M218.5 101.82 L215.92 101.8 L217.25 97.0 L211.62 83.42 L212.58 79.07 L223.62 80.48 L230.62 87.33 L228.62 95.9 L218.5 101.82 Z"
  },
  {
    "municipality_id": "1702",
    "municipality": "Boticas",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M194.67 60.6 L186.37 53.09 L188.19 47.75 L192.01 48.75 L193.24 44.96 L204.35 46.04 L212.23 38.65 L214.35 44.02 L210.31 54.03 L201.84 60.64 L203.3 55.07 L200.11 53.11 L194.67 60.6 Z"
  },
  {
    "municipality_id": "1703",
    "municipality": "Chaves",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M217.07 56.47 L213.52 58.77 L209.9 54.18 L214.41 43.07 L210.5 34.18 L217.63 32.79 L219.95 29.68 L223.19 30.5 L225.03 36.38 L229.87 31.55 L233.86 32.59 L242.88 28.6 L243.53 38.87 L236.67 39.79 L229.98 46.07 L230.14 50.42 L226.12 47.36 L222.47 58.16 L218.93 60.28 L217.07 56.47 Z"
  },
  {
    "municipality_id": "1704",
    "municipality": "Mesão Frio",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M189.14 106.63 L186.99 109.12 L188.68 100.41 L193.72 102.17 L193.09 105.57 L189.14 106.63 Z"
  },
  {
    "municipality_id": "1705",
    "municipality": "Mondim de Basto",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M188.01 88.81 L182.79 87.01 L184.11 84.57 L181.41 80.17 L186.64 69.88 L188.71 74.96 L196.69 78.33 L193.1 85.51 L188.01 88.81 Z"
  },
  {
    "municipality_id": "1706",
    "municipality": "Montalegre",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M188.0 50.01 L186.37 53.09 L191.68 56.86 L187.46 59.85 L180.1 58.11 L180.72 49.52 L170.42 49.07 L175.8 35.33 L181.84 29.43 L186.04 29.16 L187.2 23.95 L189.87 32.62 L192.04 28.77 L203.15 25.98 L212.49 28.61 L210.24 33.82 L213.03 36.67 L206.82 44.85 L198.45 47.01 L193.24 44.96 L192.01 48.75 L189.56 46.59 L188.0 50.01 Z"
  },
  {
    "municipality_id": "1707",
    "municipality": "Murça",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M231.31 81.87 L234.42 85.76 L230.62 87.33 L223.62 80.48 L212.58 79.07 L214.81 75.44 L219.84 75.22 L221.05 68.86 L225.97 65.87 L231.31 81.87 Z"
  },
  {
    "municipality_id": "1708",
    "municipality": "Peso da Régua",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M204.69 100.58 L207.92 103.74 L204.24 106.7 L196.06 104.66 L194.7 106.38 L193.72 102.17 L188.38 99.69 L189.84 96.22 L197.71 103.3 L199.98 99.53 L204.69 100.58 Z"
  },
  {
    "municipality_id": "1709",
    "municipality": "Ribeira de Pena",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M200.99 77.27 L194.21 78.07 L187.05 72.28 L188.24 67.66 L190.89 67.76 L201.06 52.89 L203.26 55.65 L199.46 63.86 L203.21 66.98 L196.98 70.31 L201.04 73.58 L200.99 77.27 Z"
  },
  {
    "municipality_id": "1710",
    "municipality": "Sabrosa",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M209.85 104.83 L207.2 104.3 L207.5 93.74 L211.69 84.41 L207.64 79.9 L209.46 78.15 L217.25 97.0 L215.3 103.37 L209.85 104.83 Z"
  },
  {
    "municipality_id": "1711",
    "municipality": "Santa Marta de Penaguião",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M199.16 99.13 L199.69 103.05 L197.71 103.3 L188.24 95.5 L193.58 93.71 L196.81 95.78 L199.4 92.92 L199.16 99.13 Z"
  },
  {
    "municipality_id": "1712",
    "municipality": "Valpaços",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M233.38 72.93 L230.29 75.05 L227.23 73.15 L228.8 69.82 L225.97 65.87 L221.04 68.86 L217.26 59.34 L223.11 57.51 L226.12 47.36 L230.14 50.42 L229.98 46.07 L236.67 39.79 L243.86 38.73 L245.28 42.79 L238.59 59.04 L241.02 66.26 L236.67 67.06 L233.38 72.93 Z"
  },
  {
    "municipality_id": "1713",
    "municipality": "Vila Pouca de Aguiar",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M207.64 79.9 L201.0 77.25 L201.04 73.58 L196.98 70.31 L203.21 66.98 L199.64 62.09 L209.9 54.18 L213.52 58.77 L217.99 56.97 L217.03 60.91 L221.84 71.01 L219.84 75.22 L217.86 74.05 L211.58 80.14 L209.46 78.15 L207.64 79.9 Z"
  },
  {
    "municipality_id": "1714",
    "municipality": "Vila Real",
    "district": "Vila Real",
    "districtDisplay": "Vila Real",
    "district_id": "17",
    "path": "M198.98 98.97 L199.42 92.93 L196.81 95.78 L193.58 93.71 L188.3 95.4 L186.19 91.14 L193.1 85.51 L196.69 78.33 L201.0 77.25 L211.69 84.41 L207.5 93.74 L208.71 102.08 L198.98 98.97 Z"
  },
  {
    "municipality_id": "1801",
    "municipality": "Armamar",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M205.74 117.67 L202.53 117.17 L203.54 114.18 L199.29 111.97 L201.49 106.41 L207.23 104.5 L210.08 106.58 L210.62 113.37 L209.2 119.67 L205.74 117.67 Z"
  },
  {
    "municipality_id": "1802",
    "municipality": "Carregal do Sal",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M178.74 186.25 L175.32 186.24 L174.54 181.51 L184.6 170.56 L187.79 179.43 L178.74 186.25 Z"
  },
  {
    "municipality_id": "1803",
    "municipality": "Castro Daire",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M184.36 140.87 L180.05 137.56 L178.88 132.6 L176.14 133.63 L177.09 130.41 L170.27 130.13 L169.38 127.28 L172.85 123.1 L182.35 124.71 L184.78 120.11 L189.77 118.95 L187.75 122.4 L194.52 126.46 L199.26 124.36 L199.98 127.52 L195.43 127.24 L190.66 132.1 L195.13 137.84 L191.91 143.43 L185.27 143.39 L184.36 140.87 Z"
  },
  {
    "municipality_id": "1804",
    "municipality": "Cinfães",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M163.68 120.77 L161.22 120.54 L159.2 114.37 L163.63 111.86 L177.8 111.57 L180.7 120.9 L183.98 122.52 L178.41 125.5 L172.95 123.27 L172.25 120.37 L169.31 124.05 L162.95 122.42 L163.68 120.77 Z"
  },
  {
    "municipality_id": "1805",
    "municipality": "Lamego",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M193.52 120.0 L192.12 123.7 L187.75 122.4 L189.78 118.96 L186.71 119.66 L191.87 110.02 L189.56 105.62 L201.49 106.41 L199.21 116.87 L193.52 120.0 Z"
  },
  {
    "municipality_id": "1806",
    "municipality": "Mangualde",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M202.45 170.77 L199.9 171.62 L199.94 169.57 L188.34 165.07 L200.18 158.62 L206.07 161.34 L214.4 158.48 L213.74 166.67 L202.45 170.77 Z"
  },
  {
    "municipality_id": "1807",
    "municipality": "Moimenta da Beira",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M208.26 133.14 L204.96 137.04 L202.72 133.7 L205.02 128.41 L199.39 126.55 L201.73 125.79 L201.9 119.06 L206.06 121.13 L210.22 115.43 L217.46 121.02 L215.83 129.06 L208.26 133.14 Z"
  },
  {
    "municipality_id": "1808",
    "municipality": "Mortágua",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M161.66 192.2 L151.08 188.06 L154.47 180.72 L153.46 175.26 L161.34 172.74 L167.36 180.16 L165.49 191.37 L161.66 192.2 Z"
  },
  {
    "municipality_id": "1809",
    "municipality": "Nelas",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M189.03 177.81 L186.1 177.55 L184.6 170.57 L188.33 165.15 L200.0 169.64 L197.84 173.44 L189.03 177.81 Z"
  },
  {
    "municipality_id": "1810",
    "municipality": "Oliveira de Frades",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M160.25 162.36 L162.59 160.96 L166.91 164.79 L163.58 167.78 L160.25 162.36 Z M164.0 153.79 L160.72 153.59 L158.65 160.18 L156.47 160.42 L153.25 149.52 L158.12 147.45 L159.82 142.47 L162.45 143.44 L160.38 147.08 L169.62 149.73 L167.47 153.79 L164.0 153.79 Z"
  },
  {
    "municipality_id": "1811",
    "municipality": "Penalva do Castelo",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M206.41 161.25 L197.39 157.93 L200.66 153.88 L212.3 150.51 L217.35 154.3 L214.92 159.06 L206.41 161.25 Z"
  },
  {
    "municipality_id": "1812",
    "municipality": "Penedono",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M232.62 123.51 L233.09 128.46 L229.97 131.6 L226.57 129.81 L223.11 122.54 L224.81 115.26 L232.45 115.44 L232.92 119.98 L229.52 120.92 L232.62 123.51 Z"
  },
  {
    "municipality_id": "1813",
    "municipality": "Resende",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M185.05 119.94 L180.7 120.9 L177.8 111.57 L187.81 109.17 L189.86 105.96 L191.87 110.03 L185.05 119.94 Z"
  },
  {
    "municipality_id": "1814",
    "municipality": "Santa Comba Dão",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M169.41 191.92 L165.01 191.85 L167.34 179.89 L176.43 178.74 L174.54 181.51 L176.35 187.13 L169.41 191.92 Z"
  },
  {
    "municipality_id": "1818",
    "municipality": "Sernancelhe",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M218.74 135.34 L214.96 135.22 L212.75 139.6 L207.18 135.03 L215.83 129.06 L218.87 119.3 L225.22 125.32 L225.82 133.34 L230.09 132.68 L223.8 141.36 L218.74 135.34 Z"
  },
  {
    "municipality_id": "1817",
    "municipality": "Sátão",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M200.02 154.67 L198.07 154.25 L198.59 145.66 L202.37 146.47 L203.67 138.0 L209.4 134.88 L212.75 139.6 L209.83 144.72 L214.46 148.28 L200.02 154.67 Z"
  },
  {
    "municipality_id": "1815",
    "municipality": "São João da Pesqueira",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M223.46 120.24 L218.97 120.19 L218.76 112.37 L221.89 110.91 L215.9 109.54 L218.27 107.45 L215.36 103.3 L224.07 98.93 L235.42 106.76 L232.63 115.34 L224.94 115.15 L223.46 120.24 Z"
  },
  {
    "municipality_id": "1816",
    "municipality": "São Pedro do Sul",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M168.69 149.81 L160.38 147.08 L162.45 143.44 L160.08 142.5 L159.57 136.99 L171.47 137.07 L170.28 129.44 L173.36 128.59 L177.09 130.41 L176.14 133.63 L178.88 132.61 L185.77 143.67 L176.97 149.15 L168.69 149.81 Z"
  },
  {
    "municipality_id": "1819",
    "municipality": "Tabuaço",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M214.65 118.57 L210.22 115.43 L208.63 104.93 L215.63 103.26 L218.27 107.45 L215.9 109.54 L221.89 110.91 L218.79 112.28 L217.46 121.02 L214.65 118.57 Z"
  },
  {
    "municipality_id": "1820",
    "municipality": "Tarouca",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M202.03 121.47 L201.73 125.79 L199.39 126.55 L196.59 123.7 L194.49 126.45 L191.92 122.97 L199.21 116.87 L199.48 113.23 L207.15 118.32 L206.06 121.13 L201.9 119.06 L202.03 121.47 Z"
  },
  {
    "municipality_id": "1821",
    "municipality": "Tondela",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M171.72 178.23 L167.01 180.02 L162.93 173.54 L157.12 170.4 L155.4 164.0 L161.39 162.89 L164.58 167.72 L169.42 159.7 L180.58 164.68 L179.55 169.78 L183.34 172.68 L178.04 178.16 L171.72 178.23 Z"
  },
  {
    "municipality_id": "1822",
    "municipality": "Vila Nova de Paiva",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M202.4 146.08 L198.71 145.56 L190.52 132.47 L195.43 127.24 L205.02 128.41 L202.4 146.08 Z"
  },
  {
    "municipality_id": "1823",
    "municipality": "Viseu",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M179.55 169.59 L181.14 165.26 L172.67 160.31 L178.52 154.14 L177.84 147.35 L182.73 146.77 L185.82 142.96 L191.1 144.0 L195.14 138.43 L199.06 144.57 L197.39 157.93 L199.4 159.16 L189.39 163.75 L184.5 170.66 L179.55 169.59 Z"
  },
  {
    "municipality_id": "1824",
    "municipality": "Vouzela",
    "district": "Viseu",
    "districtDisplay": "Viseu",
    "district_id": "18",
    "path": "M167.92 162.8 L157.99 160.73 L160.4 153.89 L167.47 153.79 L169.62 149.73 L178.73 148.52 L176.87 156.67 L172.67 160.31 L169.0 159.88 L167.92 162.8 Z"
  },
  {
    "municipality_id": "0701",
    "municipality": "Alandroal",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M238.47 380.06 L236.6 387.33 L238.74 387.69 L234.99 392.56 L232.96 384.23 L226.83 385.62 L216.49 380.37 L221.53 375.8 L221.18 365.14 L225.28 366.85 L224.75 363.11 L231.64 363.21 L234.56 358.42 L238.44 360.67 L242.5 356.23 L246.09 358.56 L241.48 361.56 L240.52 370.54 L242.92 372.04 L238.47 380.06 Z"
  },
  {
    "municipality_id": "0702",
    "municipality": "Arraiolos",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M189.55 371.49 L188.71 371.58 L188.98 369.78 L187.34 370.46 L183.72 364.48 L179.09 367.46 L173.28 365.27 L167.66 356.98 L172.31 349.77 L182.04 349.26 L183.78 344.37 L189.29 340.27 L205.01 346.87 L207.26 354.48 L200.59 356.56 L196.92 354.89 L196.89 360.28 L193.74 360.77 L194.02 366.48 L189.55 371.49 Z"
  },
  {
    "municipality_id": "0703",
    "municipality": "Borba",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M217.21 359.29 L218.97 354.06 L223.94 351.05 L221.73 346.6 L224.24 340.26 L227.87 342.72 L230.52 353.42 L224.87 356.3 L222.39 362.82 L217.21 359.29 Z"
  },
  {
    "municipality_id": "0704",
    "municipality": "Estremoz",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M203.4 365.83 L196.84 355.21 L207.07 354.98 L207.04 350.83 L197.98 342.49 L202.3 339.09 L210.16 341.97 L212.88 337.49 L217.97 335.96 L218.69 331.69 L225.34 336.29 L221.92 344.47 L223.94 351.05 L216.31 357.7 L217.77 360.82 L205.96 361.72 L203.4 365.83 Z"
  },
  {
    "municipality_id": "0706",
    "municipality": "Montemor-o-Novo",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M156.37 392.01 L153.58 392.12 L154.64 389.84 L149.79 380.62 L140.94 383.65 L138.58 380.4 L136.56 384.23 L132.94 382.05 L132.13 375.77 L138.96 369.69 L141.6 371.92 L148.9 369.62 L148.87 364.65 L143.74 361.57 L144.38 359.57 L135.18 357.62 L139.03 352.99 L141.44 354.43 L144.83 350.18 L146.57 351.38 L149.19 347.87 L154.73 349.08 L155.45 346.54 L159.64 351.9 L161.97 350.72 L166.0 353.73 L174.01 363.5 L177.95 374.17 L172.2 375.36 L171.82 373.03 L167.2 372.07 L167.38 378.73 L173.73 382.16 L173.21 387.83 L159.2 387.96 L156.37 392.01 Z"
  },
  {
    "municipality_id": "0707",
    "municipality": "Mora",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M170.01 353.28 L164.85 349.88 L167.22 346.84 L157.88 342.5 L161.18 334.4 L167.78 329.91 L171.75 330.35 L171.8 336.0 L173.77 331.29 L176.37 331.87 L179.16 334.7 L178.48 338.99 L187.08 335.76 L189.31 341.21 L183.78 344.37 L183.96 347.54 L178.18 351.02 L174.32 348.47 L170.01 353.28 Z"
  },
  {
    "municipality_id": "0708",
    "municipality": "Mourão",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M249.37 407.79 L254.75 417.64 L251.02 421.46 L247.75 411.81 L243.24 410.1 L240.27 403.13 L229.71 406.47 L229.59 408.82 L227.84 401.45 L237.01 391.47 L249.37 407.79 Z"
  },
  {
    "municipality_id": "0709",
    "municipality": "Portel",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M221.55 410.25 L225.24 414.8 L222.61 418.01 L216.53 418.15 L195.56 412.36 L185.67 406.4 L188.12 399.36 L193.83 402.18 L201.5 392.41 L205.9 391.86 L221.55 410.25 Z"
  },
  {
    "municipality_id": "0710",
    "municipality": "Redondo",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M217.21 386.86 L210.01 385.46 L209.12 383.14 L212.69 380.07 L206.51 379.93 L207.55 371.96 L203.02 366.25 L205.96 361.72 L217.77 360.82 L218.22 358.41 L222.55 363.5 L219.88 368.33 L221.53 375.8 L216.49 380.37 L220.23 383.18 L217.21 386.86 Z"
  },
  {
    "municipality_id": "0711",
    "municipality": "Reguengos de Monsaraz",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M225.47 413.97 L212.66 398.98 L215.61 388.83 L221.15 382.5 L226.83 385.62 L232.95 384.23 L235.03 388.42 L232.1 399.26 L227.84 401.45 L229.69 409.35 L225.47 413.97 Z"
  },
  {
    "municipality_id": "0712",
    "municipality": "Vendas Novas",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M129.81 370.1 L138.94 362.69 L139.72 358.57 L144.38 359.57 L143.74 361.57 L148.87 364.65 L146.79 371.48 L138.96 369.69 L132.46 374.95 L131.5 380.94 L127.43 380.14 L125.87 374.5 L129.81 370.1 Z"
  },
  {
    "municipality_id": "0713",
    "municipality": "Viana do Alentejo",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M185.35 399.87 L187.98 401.29 L187.46 405.24 L179.59 406.61 L176.77 403.81 L169.35 405.21 L153.61 398.94 L158.15 388.53 L169.1 387.4 L175.04 399.59 L184.55 394.7 L187.14 397.63 L185.35 399.87 Z"
  },
  {
    "municipality_id": "0714",
    "municipality": "Vila Viçosa",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M227.67 362.41 L224.75 363.11 L225.51 366.72 L223.48 367.22 L221.66 364.33 L224.87 356.3 L235.91 353.06 L238.49 349.24 L245.69 350.17 L243.75 357.37 L241.09 356.31 L238.44 360.67 L234.5 358.44 L230.62 363.59 L227.67 362.41 Z"
  },
  {
    "municipality_id": "0705",
    "municipality": "Évora",
    "district": "Evora",
    "districtDisplay": "Évora",
    "district_id": "07",
    "path": "M182.58 395.19 L175.04 399.59 L175.29 396.62 L172.65 396.57 L170.54 389.41 L173.21 387.83 L173.73 382.16 L167.38 378.73 L166.72 372.77 L171.81 373.02 L172.2 375.36 L177.94 374.19 L175.01 366.24 L179.09 367.46 L182.94 364.36 L189.26 371.96 L192.54 369.93 L193.73 360.79 L196.86 360.33 L197.24 357.14 L207.04 370.3 L206.51 379.93 L212.69 380.07 L209.12 383.14 L210.01 385.46 L217.26 386.83 L212.55 397.77 L207.57 395.27 L207.34 392.29 L201.5 392.41 L193.64 402.24 L189.53 398.87 L185.27 401.14 L186.38 395.27 L182.58 395.19 Z"
  }
];

export const portugalMunicipalityShapesByDistrict = portugalMunicipalityShapes.reduce<Record<string, MunicipalityMapShape[]>>(
  (current, shape) => {
    current[shape.district] = [...(current[shape.district] ?? []), shape];
    return current;
  },
  {}
);
