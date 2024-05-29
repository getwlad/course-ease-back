# Função para verificar se o banco de dados está pronto
db_is_ready() {
    # Tente conectar ao banco de dados
     PGPASSWORD="$4" psql -h "$1" -U "$2" -d "$3" -c "SELECT 1" >/dev/null 2>&1
}

# Esperar pelo banco de dados
wait_for_db() {
    # Extrair variáveis de ambiente
    host="$1"
    user="$2"
    dbname="$3"
    password="$4"

    # Tempo máximo para esperar (em segundos)
    timeout=60
    count=0

    # Debug: Imprimir os valores das variáveis de ambiente
    echo "Debug: Valores das variáveis de ambiente:"
    echo "DB_HOST: $host"
    echo "DB_USER: $user"
    echo "DB_NAME: $dbname"
    echo "DB_PASSWORD: $password"

    # Loop até que o banco de dados esteja pronto ou atingir o tempo limite
    while ! db_is_ready "$host" "$user" "$dbname" "$password" && [ "$count" -lt "$timeout" ]; do
        echo "Banco de dados não está pronto - esperando..."
        sleep 1
        count=$((count + 1))
    done

    # Verificar se atingiu o tempo limite
    if [ "$count" -ge "$timeout" ]; then
        echo "Tempo limite excedido. Falha ao conectar ao banco de dados."
        exit 1
    fi

    # Cria o esquema se não existir
    PGPASSWORD="$password" psql -h "$host" -U "$user" -d "$dbname" -c "CREATE SCHEMA IF NOT EXISTS course_ease;" >/dev/null 2>&1

    echo "Banco de dados está pronto. Iniciando a aplicação."
}

# Chamada para esperar pelo banco de dados
wait_for_db "$DB_HOST" "$DB_USER" "$DB_NAME" "$DB_PASSWORD"
