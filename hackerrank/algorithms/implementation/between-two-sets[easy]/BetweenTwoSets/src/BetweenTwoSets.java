import java.util.ArrayList;
import java.util.List;

class Result {

    /*
     * Complete the 'getTotalX' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts following parameters:
     *  1. INTEGER_ARRAY a
     *  2. INTEGER_ARRAY b
     */

    public static int getTotalX(List<Integer> a, List<Integer> b) {
        // Write your code here
        int maxA = a.get(0);
        int minB = b.get(0);
        for (Integer aEle: a) {
            maxA = Math.max(aEle, maxA);
        }
        for (Integer bEle: b) {
            minB = Math.min(bEle, minB);
        }

        int count = 0;
        // System.out.println(maxA);
        // System.out.println(minB);
        for (int num = maxA; num <= minB; num++) {
            Boolean ok = true;
            for (Integer aEle: a) {
                if (num % aEle != 0) {
                    // System.out.println(aEle);
                    ok = false;
                    break;
                }
            }
            if (!ok) {continue;}
            for (Integer bEle: b) {
                if (bEle % num != 0) {
                    // System.out.println(bEle);
                    ok = false;
                    break;
                }
            }
            if (ok) {
                count++;
            }
        }

        return count;
    }

}
public class BetweenTwoSets {
    public static void main (String[] args) {
//        int[] a = {2, 4};
//        int[] b = {16, 32, 96};
        ArrayList<Integer> a = new ArrayList<Integer>();
        a.add(2);
        a.add(4);
        ArrayList<Integer> b = new ArrayList<Integer>();
        b.add(16);
        b.add(32);
        b.add(96);
        System.out.println(Result.getTotalX(a, b));
    }
}
