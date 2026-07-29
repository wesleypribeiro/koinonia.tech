import requests
import time
import csv
import urllib.parse
import re
import time
from ddgs import DDGS

# ==========================================
# SCRIPT DE PROSPECÇÃO DE LEADS - KOINONIA TECH
# ==========================================

# Sua chave da API do Google Maps (Já configurada)
API_KEY = "AIzaSyA-vyGuxhizrN16geMmlgbvyIx4euahcXs"

# Defina a quantidade máxima de leads que o script deve extrair
MAX_LEADS = 10

# Multiplicamos as buscas para trazer centenas de leads (20 nichos diferentes)
QUERIES = [
    "barbearia em São José dos Campos",
    "salão de beleza em São José dos Campos",
    "escola de inglês em São José dos Campos",
    "imobiliária em São José dos Campos",
    "restaurante em São José dos Campos",
    "loja de roupas em São José dos Campos",
    "oficina mecânica em São José dos Campos",
    "clínica odontológica em São José dos Campos",
    "estúdio de pilates em São José dos Campos",
    "pet shop em São José dos Campos",
    "academia em São José dos Campos",
    "cafeteria em São José dos Campos",
    "pizzaria em São José dos Campos",
    "hamburgueria em São José dos Campos",
    "estética automotiva em São José dos Campos",
    "loja de materiais de construção em São José dos Campos",
    "advocacia em São José dos Campos",
    "escritório de contabilidade em São José dos Campos",
    "arquitetura em São José dos Campos",
    "nutricionista em São José dos Campos"
]

def get_exact_instagram(name):
    """
    Usa o DuckDuckGo Lite com 'impersonation' para buscar a URL exata do Instagram.
    Totalmente gratuito e burla bloqueios!
    """
    query = f"{name} são josé dos campos instagram"
    try:
        results = DDGS().text(query, max_results=3, backend="lite")
        for res in results:
            url = res.get('href', '')
            if "instagram.com" in url:
                match = re.search(r'https://(?:www\.)?instagram\.com/(?!p/|explore/|reel/|tags/)[a-zA-Z0-9_.]+', url)
                if match:
                    return match.group(0)
    except Exception:
        pass
        
    return "Não encontrado"

def get_places(query):
    """Busca os estabelecimentos, navegando por TODAS as páginas de resultados"""
    places = []
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={urllib.parse.quote(query)}&key={API_KEY}"
    
    while True:
        response = requests.get(url)
        if response.status_code != 200:
            break
            
        data = response.json()
        places.extend(data.get('results', []))
        
        # A API do Google divide os resultados em até 3 páginas (max 60 resultados por nicho)
        next_page_token = data.get('next_page_token')
        if not next_page_token:
            break
            
        # O Google exige uma espera de ~2 segundos para gerar a próxima página
        time.sleep(2)
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={API_KEY}"
        
    return places

def get_place_details(place_id):
    """Puxa o detalhe para checar se tem site"""
    fields = "name,formatted_phone_number,website,url"
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields={fields}&key={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get('result', {})
    return {}

def main():
    print("Iniciando varredura PROFUNDA de Leads para a Koinonia Tech...")
    print("Isso pode levar alguns minutos (Aguarde), pois o script vai buscar várias páginas e os Instagrams exatos.\n")
    
    with open('leads_koinonia_sjc.csv', mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Nome da Empresa', 'Nicho', 'Telefone', 'Google Maps', 'Link do Instagram'])
        
        total_leads = 0

        for query in QUERIES:
            if total_leads >= MAX_LEADS:
                break

            print(f"Buscando por: '{query}'...")
            places = get_places(query)
            
            for place in places:
                if total_leads >= MAX_LEADS:
                    break

                place_id = place.get('place_id')
                details = get_place_details(place_id)
                
                # Filtrar os que NÃO POSSUEM SITE
                if not details.get('website'):
                    nome = details.get('name', 'Desconhecido')
                    telefone = details.get('formatted_phone_number', 'Sem Telefone')
                    maps_url = details.get('url', '')
                    
                    # Busca o Instagram EXATO
                    link_insta = get_exact_instagram(nome)
                    
                    writer.writerow([nome, query, telefone, maps_url, link_insta])
                    print(f"✅ LEAD ENCONTRADO: {nome} | {link_insta}")
                    total_leads += 1
                    
                    # Pausa leve para não ser bloqueado pelo Google Search ao caçar os Instagrams
                    time.sleep(1.5)
                
    print(f"\nVarredura concluída com SUCESSO! {total_leads} leads extraídos e salvos no arquivo 'leads_koinonia_sjc.csv'.")

if __name__ == "__main__":
    main()
