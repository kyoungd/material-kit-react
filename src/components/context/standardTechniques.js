const standarizeDetail = (data) => {
  const results = [];
  data.forEach((item) => {
    results.push({
      ...item.attributes,
      image: standarizePhoto(item.attributes.photo, 'medium')
    });
  });
  return results;
};

const standarizePhoto = (photo, size) => {
  try {
    return photo.data.attributes.formats[size].url;
  } catch (e) {
    return '';
  }
};

const StandarizeTechniques = (data) => {
  const std = data.map((item) => {
    const row = {
      id: item.id,
      cover: standarizePhoto(item.attributes.photo, 'medium'),
      name: item.attributes.name,
      videoUrl: item.attributes.video,
      description: item.attributes.description,
      price: item.attributes.price,
      priceSale: item.attributes.sales_price,
      colors: '#FF4842',
      access: item.attributes.access,
      status: item.attributes.status,
      link: '/dashboard/expert',
      features: {
        id: item.id,
        person: {
          product: item.attributes.name,
          name: item.attributes.techName,
          summary: item.attributes.techSummary,
          description: item.attributes.techDescription,
          image: standarizePhoto(item.attributes.techPhoto, 'medium')
        },
        data: standarizeDetail(item.attributes.technique_details.data),
        sales: {
          price: item.attributes.price,
          priceSale: item.attributes.sales_price,
          access: item.attributes.access,
          status: item.attributes.status
        }
      },
      stripePriceId: item.attributes.stripePriceId
    };
    return row;
  });
  return std;
};

export default StandarizeTechniques;
