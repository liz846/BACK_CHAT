const Catalog = require('../model/catalogModel');
const Company = require('../model/companyModel');

const normalize = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const scoreMatch = (question, productName) => {
  const qWords = question.split(' ');
  const pWords = productName.split(' ');

  let score = 0;

  for (const word of pWords) {
    if (qWords.includes(word)) score += 1;
  }

  score -= Math.max(0, pWords.length - qWords.length);

  return score;
};

class ChatbotService {
  async process(question) {
    try {
      if (!question) return 'Pregunta no válida';

      const q = normalize(question);

      const wantsFullInfo =
        q.includes('informacion') ||
        q.includes('detalles') ||
        q.includes('ficha');

      const wantsDescription = q.includes('descripcion');
      const wantsProperties = q.includes('propiedad');
      const wantsAdvantages = q.includes('ventaja');
      const wantsUses = q.includes('uso') || q.includes('sirve');
      const wantsUsesSeg = q.includes('usos');
      const wantsApplications = q.includes('aplicacion');
      const wantsPresentation = q.includes('presentacion');
      const wantsLineaEco = q.includes('economica');
      const wantsLineaPre = q.includes('premium');
      const wantsAroma = q.includes('aroma');
      const wantsRecomUses = q.includes('recomendaciones');

      const wantsMission = q.includes('mision');
      const wantsVision = q.includes('vision');
      const wantsPolicy = q.includes('politica');
      const wantsObjectives = q.includes('objetivos');
      const wantsValues = q.includes('valores');
      const wantsFullAddress = q.includes('direccion') || q.includes('ubicacion');
      const wantsWeekdays = q.includes('horario');

      const wantsCompanyDescription =
        q.includes('descripcion') && q.includes('empresa');

      const wantsCompanySection =
        q.includes('empresa') ||
        q.includes('quienes somos') ||
        wantsMission ||
        wantsVision ||
        wantsPolicy ||
        wantsObjectives ||
        wantsValues ||
        wantsFullAddress ||
        wantsWeekdays;

      const company = await Company.findOne();

      if (company && wantsCompanySection) {
        let responseParts = [];

        if (wantsCompanyDescription && company.companyDescription)
          responseParts.push(`Descripción: ${company.companyDescription}`);

        if (wantsMission && company.mission)
          responseParts.push(`Misión: ${company.mission}`);

        if (wantsVision && company.vision)
          responseParts.push(`Visión: ${company.vision}`);

        if (wantsPolicy && company.policy)
          responseParts.push(`Política de calidad: ${company.policy}`);

        if (wantsObjectives && company.objectives)
          responseParts.push(`Objetivos: ${company.objectives}`);

        if (wantsValues && company.values)
          responseParts.push(`Valores: ${company.values}`);

        if (wantsFullAddress && company.address?.fullAddress)
          responseParts.push(`Dirección: ${company.address.fullAddress}`);

        if (wantsWeekdays && company.schedule?.weekdays)
          responseParts.push(`Horario: ${company.schedule.weekdays}`);

        return responseParts.length
          ? responseParts.join(' | ')
          : 'No tengo una respuesta para esa pregunta. Por favor contáctanos directamente al correo sistemaweb71@gmail.com para más información.';
      }

      const catalogs = await Catalog.find();

      if (
        q.includes('que productos venden') ||
        q.includes('qué productos venden') ||
        q.includes('catalogo') ||
        q.includes('catálogo')
      ) {
        return catalogs.map(c => c.categoryName).join(', ');
      }

      for (const category of catalogs) {
        const categoryName = normalize(category.categoryName);

        if (
          q.includes(categoryName) &&
          (
            q.includes('productos') ||
            q.includes('que hay') ||
            q.includes('qué hay') ||
            q.includes('lista') ||
            q.includes('ver')
          )
        ) {
          if (!category.products || category.products.length === 0) {
            return `La categoría ${category.categoryName} no tiene productos registrados.`;
          }

          const productList = category.products
            .map(p => p.name || p.nameSeg)
            .join(', ');

          return `${category.categoryName}: ${productList}`;
        }
      }

      let exactMatch = null;
      let bestMatch = null;
      let bestScore = -Infinity;

      for (const category of catalogs) {
        for (const product of category.products) {
          const rawName = product.name || product.nameSeg;
          if (!rawName) continue;

          const productName = normalize(rawName);

          if (q === productName) {
            exactMatch = product;
            break;
          }

          if (q.includes(productName)) {
            const score = productName.split(' ').length + 5;
            if (score > bestScore) {
              bestScore = score;
              bestMatch = product;
            }
            continue;
          }

          const score = scoreMatch(q, productName);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = product;
          }
        }
        if (exactMatch) break;
      }

      const product = exactMatch || (bestScore > 0 ? bestMatch : null);

      if (product) {
        if (wantsDescription)
          return `DESCRIPCIÓN: ${product.description || product.decripSeg}`;

        if (wantsProperties && product.propietys)
          return `PROPIEDADES Y VENTAJAS: ${product.propietys}`;

        if (wantsAdvantages && product.advantagesSeg)
          return `VENTAJAS: ${product.advantagesSeg}`;

        if (wantsUses && product.uses)
          return `USOS: ${product.uses}`;

        if (wantsUsesSeg && product.usesSeg)
          return `USOS Y APLICACIONES: ${product.usesSeg}`;

        if (wantsApplications && product.applications)
          return `APLICACIONES: ${product.applications}`;

        if (wantsPresentation)
          return `PRESENTACIÓN: ${product.presentation || product.lineaPre}`;

        if (wantsLineaEco && product.lineaEco)
          return `LÍNEA ECONÓMICA: ${product.lineaEco}`;

        if (wantsLineaPre && product.lineaPre)
          return `LÍNEA PREMIUM: ${product.lineaPre}`;

        if (wantsAroma && product.aromas)
          return `AROMAS: ${product.aromas}`;

        if (wantsRecomUses && product.recomUses)
          return `RECOMENDACIONES: ${product.recomUses}`;

        if (wantsFullInfo) {
          let response = `Producto: ${product.name || product.nameSeg}`;

          if (product.description)
            response += ` | Descripción: ${product.description}`;
          if (product.decripSeg)
            response += ` | Descripción: ${product.decripSeg}`;
          if (product.uses || product.usesSeg)
            response += ` | Usos: ${product.uses || product.usesSeg}`;
          if (product.propietys)
            response += ` | Propiedades: ${product.propietys}`;
          if (product.advantagesSeg)
            response += ` | Ventajas: ${product.advantagesSeg}`;
          if (product.presentation || product.lineaPre)
            response += ` | Presentación: ${product.presentation || product.lineaPre}`;
          if (product.lineaEco)
            response += ` | Línea Económica: ${product.lineaEco}`;
          if (product.aromas)
            response += ` | Aromas: ${product.aromas}`;
          if (product.recomUses)
            response += ` | Recomendaciones: ${product.recomUses}`;
          if (product.applications)
            response += ` | Aplicaciones: ${product.applications}`;

          return response;
        }

        return `Producto: ${product.name || product.nameSeg}`;
      }

      return 'No tengo una respuesta para esa pregunta. Por favor contáctanos directamente al correo sistemaweb71@gmail.com para más información.';

    } catch (error) {
      console.error('Chatbot error:', error);
      return 'Ocurrió un error al procesar la información';
    }
  }
}

module.exports = new ChatbotService();
