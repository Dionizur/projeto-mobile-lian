import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Tipagem para o feriado, não encosta pq esse deu trabalho.
type Holiday = {
  date: string;
  localName: string;
};

export default function FeriadosScreen() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/BR`);
        
        if (!response.ok) {
          throw new Error('Erro na resposta da API.(SMT)');
        }

        const data: Holiday[] = await response.json();

        const today = new Date();
        const upcoming = data.filter(holiday => new Date(holiday.date) >= today);

        setHolidays(upcoming);
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar feriados.');
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Próximos Feriados no Brasil</Text>

      <FlatList
        data={holidays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.holidayItem}>
            <Text style={styles.holidayDate}>{item.date}</Text>
            <Text style={styles.holidayName}>{item.localName}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum feriado futuro encontrado.</Text>}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  holidayItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  holidayDate: {
    color: '#007AFF',
    fontSize: 16,
  },
  holidayName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
