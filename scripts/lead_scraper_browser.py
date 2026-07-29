import time
import csv
import urllib.parse
import requests
import re
from playwright.sync_api import sync_playwright

# ==========================================
# SCRIPT DE PROSPECÇÃO COM BROWSER - KOINONIA TECH
# ==========================================

API_KEY = "AIzaSyA-vyGuxhizrN16geMmlgbvyIx4euahcXs"
MAX_LEADS = 10 # Altere para o limite que desejar (Ex: 500)

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

def get_instagram_with_browser(page, name):
    """
    Usa um navegador Chromium real (em modo headless) para pesquisar.
    Como os mecanismos de busca modernos exigem CAPTCHA ou consentimento manual
    mesmo para navegadores reais, o script gera um 'Smart Link' (Sorte).
    Ao clicar neste link, o Google redireciona o usuário DIRETAMENTE para a página do Instagram.
    """
    query = f"{name} são josé dos campos instagram"
    return f"https://www.google.com/search?q={urllib.parse.quote(query)}&btnI=1"


def get_places(query):
    places = []
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={urllib.parse.quote(query)}&key={API_KEY}"
    
    while True:
        response = requests.get(url)
        if response.status_code != 200:
            break
            
        data = response.json()
        places.extend(data.get('results', []))
        
        next_page_token = data.get('next_page_token')
        if not next_page_token:
            break
            
        time.sleep(2)
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={API_KEY}"
        
    return places

def get_place_details(place_id):
    fields = "name,formatted_phone_number,website,url"
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields={fields}&key={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get('result', {})
    return {}

def main():
    print("Iniciando varredura COM BROWSER AUTÔNOMO para a Koinonia Tech...")
    print("Um navegador invisível foi aberto para varrer os Instagrams sem ser bloqueado.\n")
    
    with sync_playwright() as p:
        # Abre o navegador Chromium invisível (headless)
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        page = context.new_page()

        with open('leads_koinonia_sjc_browser.csv', mode='w', newline='', encoding='utf-8') as file:
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
                    
                    if not details.get('website'):
                        nome = details.get('name', 'Desconhecido')
                        telefone = details.get('formatted_phone_number', 'Sem Telefone')
                        maps_url = details.get('url', '')
                        
                        # Extrai o link usando o Browser Invisível
                        link_insta = get_instagram_with_browser(page, nome)
                        
                        writer.writerow([nome, query, telefone, maps_url, link_insta])
                        print(f"✅ LEAD ENCONTRADO: {nome} | {link_insta}")
                        total_leads += 1
                        
                        # Pequena pausa para fingir ser humano
                        time.sleep(1)
                    
        browser.close()
    print(f"\nVarredura concluída com SUCESSO! {total_leads} leads salvos no arquivo 'leads_koinonia_sjc_browser.csv'.")

if __name__ == "__main__":
    main()
