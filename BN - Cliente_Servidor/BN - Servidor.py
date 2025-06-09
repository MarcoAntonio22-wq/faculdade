import socket
import threading
import random

HOST = "127.0.0.1"
PORT = 12345

jogadores = [] 
jogos = {}  # Dicionário para armazenar o estado dos jogos

def criar_tabuleiro():
    return [["~"] * 5 for _ in range(5)]

def colocar_navio(tabuleiro):
    direcao = random.choice(["horizontal", "vertical"])
    tamanho_navio = 3
    if direcao == "horizontal":
        linha = random.randint(0, 4)
        coluna = random.randint(0, 2)
        for i in range(tamanho_navio):
            tabuleiro[linha][coluna + i] = "N"
    else:
        linha = random.randint(0, 2)
        coluna = random.randint(0, 4)
        for i in range(tamanho_navio):
            tabuleiro[linha + i][coluna] = "N"

def verificar_ataque(tabuleiro, linha, coluna):
    if tabuleiro[linha][coluna] == "N":
        tabuleiro[linha][coluna] = "X"
        return True
    return False

def verificar_vitoria(tabuleiro):
    for linha in tabuleiro:
        if "N" in linha:
            return False
    return True

def handle_jogador(cliente, endereco):
    print(f"[NOVA CONEXÃO] {endereco} conectado.")
    jogadores.append(cliente)
    if len(jogadores) % 2 == 0:
        jogo_id = len(jogadores) // 2
        jogos[jogo_id] = {
            "tabuleiros": [criar_tabuleiro(), criar_tabuleiro()],
            "jogadores": [jogadores[-2], jogadores[-1]],
            "turno": 0
        }
        for tabuleiro in jogos[jogo_id]["tabuleiros"]:
            colocar_navio(tabuleiro)
        threading.Thread(target=gerenciar_jogo, args=(jogo_id,)).start()

def gerenciar_jogo(jogo_id):
    jogo = jogos[jogo_id]
    jogadores = jogo["jogadores"]
    tabuleiros = jogo["tabuleiros"]
    while True:
        jogador_atual = jogo["turno"]
        jogador_oponente = 1 - jogador_atual
        jogadores[jogador_atual].send("SUA VEZ".encode())
        try:
            dados = jogadores[jogador_atual].recv(1024).decode()
            linha, coluna = map(int, dados.split(","))
            if verificar_ataque(tabuleiros[jogador_oponente], linha, coluna):
                jogadores[jogador_atual].send("ACERTOU".encode())
            else:
                jogadores[jogador_atual].send("ERROU".encode())
            if verificar_vitoria(tabuleiros[jogador_oponente]):
                jogadores[jogador_atual].send("VITORIA".encode())
                jogadores[jogador_oponente].send("DERROTA".encode())
                break
            jogo["turno"] = jogador_oponente
        except:
            break

def iniciar_servidor():
    servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    servidor.bind((HOST, PORT))
    servidor.listen(5)
    print(f"[SERVIDOR ATIVO] Escutando em {HOST}:{PORT}")
    while True:
        cliente, endereco = servidor.accept()
        threading.Thread(target=handle_jogador, args=(cliente, endereco)).start()

iniciar_servidor()
