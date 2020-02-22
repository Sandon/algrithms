public class Kangaroo {
    static String kangaroo(int x1, int v1, int x2, int v2) {
        int xDiff = x1 - x2;
        int vDiff = v2 - v1;
        if (vDiff != 0 && xDiff % vDiff == 0 && xDiff / vDiff > 0) {
            return "YES";
        } else {
            return "NO";
        }
    }
    public static void main(String[] args) {
        System.out.println(kangaroo(0, 3, 4, 2));
        System.out.println(kangaroo(0, 2, 5, 3));
    }
}
