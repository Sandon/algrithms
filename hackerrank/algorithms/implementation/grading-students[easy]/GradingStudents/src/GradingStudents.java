import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.joining;

public class GradingStudents {
    public static void main (String[] args) {
        ArrayList<Integer> grades = new ArrayList<Integer>();
        grades.add(73);
        grades.add(67);
        grades.add(38);
        grades.add(33);
//        Integer [] i = {73, 67, 38, 33};
//        ArrayList<Integer> grades = new ArrayList<Integer>({73, 67, 38, 33});
        List<Integer> result = Result.gradingStudents(grades);

        System.out.println(
            result.stream()
                .map(Object::toString)
                .collect(joining("\n"))
                + "\n"
        );
    }
}

class Result {

    /*
     * Complete the 'gradingStudents' function below.
     *
     * The function is expected to return an INTEGER_ARRAY.
     * The function accepts INTEGER_ARRAY grades as parameter.
     */

    public static List<Integer> gradingStudents(List<Integer> grades) {
        // Write your code here
        ArrayList<Integer> result = new ArrayList<Integer>();
        for (Integer grade : grades) {
            if (grade < 38) {
                result.add(grade);
            } else {
                Integer diff = 5 - grade % 5;
                // 0,1,2,3,4
                // 5,4,3,2,1
                if (diff < 3) {
                    result.add(grade + diff);
                } else {
                    result.add(grade);
                }
            }
        }
        return result;
    }
}