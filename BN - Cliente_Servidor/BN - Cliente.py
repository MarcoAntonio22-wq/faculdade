import socket

HOST = "127.0.0.1"
PORT = 12345

def imprimir_tabuleiro(tabuleiro):
    print("  0 1 2 3 4")
    for i, linha in enumerate(tabuleiro):
        print(f"{i} " + " ".join(linha))

def iniciar_cliente():
    cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    cliente.connect((HOST, PORT))
    print("Conectado ao servidor. Aguardando outro jogador...")
    
    tabuleiro = [["~"] * 5 for _ in range(5)]
    
    while True:
        mensagem = cliente.recv(1024).decode()
        if mensagem == "SUA VEZ":
            print("Seu tabuleiro:")
            imprimir_tabuleiro(tabuleiro)
            print("Sua vez de atacar!")
            try:
                linha = int(input("Escolha uma linha (0-4): "))
                coluna = int(input("Escolha uma coluna (0-4): "))
                cliente.send(f"{linha},{coluna}".encode())
            except ValueError:
                print("Entrada inválida. Tente novamente.")
                continue
            resposta = cliente.recv(1024).decode()
            print("Resultado do ataque:", resposta)
            if resposta == "ACERTOU":
                tabuleiro[linha][coluna] = "X"
            else:
                tabuleiro[linha][coluna] = "O"
        elif mensagem == "VITORIA":
            print("Parabéns! Você venceu!")
            break
        elif mensagem == "DERROTA":
            print("Você perdeu. Melhor sorte na próxima vez!")
            break
    
    cliente.close()

iniciar_cliente()
