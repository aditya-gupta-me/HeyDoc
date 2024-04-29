import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PageHeader from '../Components/Shared/PageHeader';

export default function Explore() {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [bmiResult, setBmiResult] = useState(null);
    const [idealWeightResult, setIdealWeightResult] = useState(null);
    const [healthyWeightResult, setHealthyWeightResult] = useState(null);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const resetForm = () => {
        setAge('');
        setHeight('');
        setWeight('');
        setGender('');
        setBmiResult(null);
        setIdealWeightResult(null);
        setHealthyWeightResult(null);
        setShowRecommendations(false); // Hide recommendations when resetting the form
    };

    const calculateRecommendations = (bmiResult) => {
        let recommendations = [];
        if (bmiResult && bmiResult.result) {
            if (bmiResult.result === 'Underweight') {
                recommendations.push("Eat a balanced diet rich in proteins and healthy fats.");
                recommendations.push("Include strength training exercises to build muscle mass.");
            } else if (bmiResult.result === 'Healthy') {
                recommendations.push("Maintain a balanced diet and regular exercise routine.");
                recommendations.push("Monitor your weight regularly to ensure it stays within a healthy range.");
            } else if (bmiResult.result === 'Overweight') {
                recommendations.push("Focus on portion control and reduce calorie intake.");
                recommendations.push("Incorporate aerobic exercises like walking, jogging, or swimming into your routine.");
            } else if (bmiResult.result === 'Obese') {
                recommendations.push("Consult with a healthcare professional to develop a comprehensive weight loss plan.");
                recommendations.push("Consider joining a support group or seeking counseling to address emotional eating habits.");
            } else if (bmiResult.result === 'Extremely obese') {
                recommendations.push("Seek medical advice and consider options such as weight loss surgery if recommended by a healthcare professional.");
                recommendations.push("Focus on making gradual lifestyle changes to improve overall health and well-being.");
            }
        }
        return recommendations;
    };

    const validateForm = () => {
        if (!age || !height || !weight || !gender) {
            alert('All fields are required!');
        } else {
            countBmi();
            calculateIdealWeight();
            calculateHealthyWeight();
            setShowRecommendations(true); // Show recommendations when the form is submitted
        }
    };

    const countBmi = () => {
        const bmi = (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(2);
        let result = '';
        if (bmi < 18.5) {
            result = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            result = 'Healthy';
        } else if (bmi >= 25 && bmi <= 29.9) {
            result = 'Overweight';
        } else if (bmi >= 30 && bmi <= 34.9) {
            result = 'Obese';
        } else if (bmi >= 35) {
            result = 'Extremely obese';
        }
        setBmiResult({ bmi, result });
    };

    const calculateIdealWeight = () => {
        const idealWeight = 21 * ((parseFloat(height) / 100) ** 2);
        setIdealWeightResult(idealWeight.toFixed(2));
    };

    const calculateHealthyWeight = () => {
        const minHealthyWeight = 18.5 * ((parseFloat(height) / 100) ** 2);
        const maxHealthyWeight = 24.9 * ((parseFloat(height) / 100) ** 2);
        setHealthyWeightResult({ min: minHealthyWeight.toFixed(2), max: maxHealthyWeight.toFixed(2) });
    };

    return (
        <>
        <View style={{
            paddingTop: 60,
            paddingLeft: 30,

        }}>
        <PageHeader title={'Explore'} backButton={false} />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Find Recommendation</Text>
            <View style={styles.form}>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your age"
                        onChangeText={setAge}
                        value={age}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Height (cm)</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your height"
                        onChangeText={setHeight}
                        value={height}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Weight (kg)</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your weight"
                        onChangeText={setWeight}
                        value={weight}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.genderRow}>
                    <TouchableOpacity
                        style={[
                            styles.genderButton,
                            gender === 'male' && styles.selectedGender,
                        ]}
                        onPress={() => setGender('male')}
                    >
                        <Text style={styles.genderText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.genderButton,
                            gender === 'female' && styles.selectedGender,
                        ]}
                        onPress={() => setGender('female')}
                    >
                        <Text style={styles.genderText}>Female</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
                    <Text style={styles.submitButtonText}>Calculate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                {showRecommendations && ( // Show recommendations only when the form is submitted
                    <>
                        {bmiResult && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>BMI:</Text>
                                <Text style={styles.resultText}>{bmiResult.bmi}</Text>
                                <Text style={styles.resultLabel}>Result:</Text>
                                <Text style={styles.resultText}>{bmiResult.result}</Text>
                            </View>
                        )}
                        {idealWeightResult && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>Ideal Weight:</Text>
                                <Text style={styles.resultText}>{idealWeightResult} kg</Text>
                            </View>
                        )}
                        {healthyWeightResult && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>Healthy Weight Range:</Text>
                                <Text style={styles.resultText}>
                                    {healthyWeightResult.min} - {healthyWeightResult.max} kg
                                </Text>
                            </View>
                        )}
                        <View style={styles.recommendationsContainer}>
                            <Text style={styles.recommendationsHeader}>Recommendations:</Text>
                            {calculateRecommendations(bmiResult).map((recommendation, index) => (
                                <Text key={index} style={styles.recommendationItem}>
                                    {recommendation}
                                </Text>
                            ))}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 45,
        paddingHorizontal: 25,
    },
    header: {
        fontSize: 28,
        fontFamily: 'outfitBold',
        color: '#289df6',
        marginBottom: 20,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        fontFamily: 'outfitRegular',
    },
    label: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'outfitBold',
        marginRight: 10,
    },
    textInput: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 16,
    },
    genderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    genderButton: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dbeffe',
        padding: 10,
        margin: 10,
    },
    selectedGender: {
        backgroundColor: '#289df6',
    },
    genderText: {
        fontSize: 16,
        fontFamily: 'outfitBold',
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#289df6',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        fontFamily: 'outfitBold',
        color: '#fff',
    },
    resetButton: {
        backgroundColor: '#ff6347',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    resetButtonText: {
        fontSize: 18,
        fontFamily: 'outfitBold',
        color: '#fff',
    },
    resultContainer: {
        marginTop: 20,
    },
    resultLabel: {
        fontSize: 18,
        fontFamily: 'outfitBold',
        marginBottom: 5,
    },
    resultText: {
        fontSize: 16,
        fontFamily: 'outfitRegular',
    },
    recommendationsContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    recommendationsHeader: {
        fontSize: 20,
        fontFamily: 'outfitBold',
        marginBottom: 10,
    },
    recommendationItem: {
        fontSize: 16,
        fontFamily: 'outfitRegular',
        marginBottom: 5,
    },
});
